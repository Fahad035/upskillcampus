import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, FileText, MessageCircle, Star, ShoppingCart, Send, LoaderCircle, ShieldCheck, BadgeDollarSign, CreditCard, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { addToCart, createReview, getMerchants, getMerchantRating, getMerchantReviews } from '../api/marketplace';
import { createPaymentOrder, verifyPayment } from '../api/payment';

const ClientPortal = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ avgRating: 0, totalReviews: 0 });
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    if (!checkoutOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [checkoutOpen]);

  useEffect(() => {
    const loadMerchants = async () => {
      setLoading(true);
      try {
        const response = await getMerchants();
        const merchantList = Array.isArray(response.data) ? response.data : [];
        setMerchants(merchantList);
        setSelectedMerchant(merchantList[0] || null);
      } finally {
        setLoading(false);
      }
    };

    loadMerchants();
  }, []);

  useEffect(() => {
    const loadMerchantDetails = async () => {
      if (!selectedMerchant?._id) {
        setReviews([]);
        setRating({ avgRating: 0, totalReviews: 0 });
        return;
      }

      const [reviewsResponse, ratingResponse] = await Promise.allSettled([
        getMerchantReviews(selectedMerchant._id),
        getMerchantRating(selectedMerchant._id),
      ]);

      if (reviewsResponse.status === 'fulfilled') {
        setReviews(Array.isArray(reviewsResponse.value.data) ? reviewsResponse.value.data : []);
      }

      if (ratingResponse.status === 'fulfilled') {
        setRating(ratingResponse.value.data || { avgRating: 0, totalReviews: 0 });
      }
    };

    loadMerchantDetails();
  }, [selectedMerchant]);

  const activeServiceCount = useMemo(() => selectedMerchant?.services?.length || 0, [selectedMerchant]);

  const openCheckout = (service) => {
    setSelectedService(service);
    setCheckoutOpen(true);
    setPaymentError('');
    setPaymentMessage('');
  };

  const handleAddToCart = async (serviceId) => {
    setActionMessage('');
    setActionError('');

    try {
      await addToCart({ merchantId: selectedMerchant._id, serviceId });
      setActionMessage('Service added to cart.');
    } catch (error) {
      setActionError(error?.response?.data?.msg || 'Sign in to add services to the cart.');
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    setActionMessage('');
    setActionError('');

    try {
      await createReview({
        merchantId: selectedMerchant._id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });

      setActionMessage('Review submitted successfully.');
      setReviewForm({ rating: 5, comment: '' });

      const [reviewsResponse, ratingResponse] = await Promise.all([getMerchantReviews(selectedMerchant._id), getMerchantRating(selectedMerchant._id)]);
      setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      setRating(ratingResponse.data || { avgRating: 0, totalReviews: 0 });
    } catch (error) {
      setActionError(error?.response?.data?.msg || 'Sign in to submit a review.');
    }
  };

  const handlePayNow = async () => {
    if (!selectedMerchant || !selectedService) return;
    const amount = Number(selectedService.price || 0);
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!amount || amount <= 0) {
      setPaymentError('This service does not have a fixed price. Please contact the merchant for a custom quote.');
      return;
    }

    if (!window.Razorpay) {
      setPaymentError('Payment widget failed to load. Please refresh the page and try again.');
      return;
    }

    if (!razorpayKey) {
      setPaymentError('Payment Failed: Razorpay key is missing. Set VITE_RAZORPAY_KEY_ID in frontend .env and restart the dev server.');
      return;
    }

    setPaymentLoading(true);
    setPaymentError('');
    setPaymentMessage('');

    try {
      const orderResponse = await createPaymentOrder({ amount });
      const order = orderResponse.data;

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: selectedMerchant.businessName,
        description: selectedService.name,
        order_id: order.id,
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
        },
        notes: {
          merchantId: selectedMerchant._id,
          serviceId: selectedService._id,
          serviceName: selectedService.name,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async (response) => {
          try {
            const verificationResponse = await verifyPayment({
              ...response,
              merchantId: selectedMerchant._id,
              serviceId: selectedService._id,
              amount,
            });

            setPaymentMessage('Payment successful. Your order is confirmed.');
            setCheckoutOpen(false);
            navigate(
              `/payment/success?merchant=${encodeURIComponent(selectedMerchant.businessName)}&service=${encodeURIComponent(selectedService.name)}&amount=${encodeURIComponent(amount)}&paymentId=${encodeURIComponent(response.razorpay_payment_id)}&orderId=${encodeURIComponent(verificationResponse.data?.order?._id || '')}`,
              {
                state: {
                  merchantName: selectedMerchant.businessName,
                  serviceName: selectedService.name,
                  amount,
                  paymentId: response.razorpay_payment_id,
                  orderId: verificationResponse.data?.order?._id || '',
                },
              },
            );
          } catch (verifyErr) {
            setPaymentError(verifyErr?.response?.data?.msg || 'Payment was completed but verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            setCheckoutOpen(false);
            document.body.style.overflow = '';
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', () => {
        setPaymentLoading(false);
        setPaymentError('Payment failed. Please try again or use a different method.');
        setCheckoutOpen(false);
        document.body.style.overflow = '';
      });
      razorpay.open();
    } catch (error) {
      setPaymentError(error?.response?.data?.error || error?.response?.data?.msg || 'Unable to start payment.');
      setCheckoutOpen(false);
      document.body.style.overflow = '';
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Client Portal</h1>
          <p className="text-xl text-gray-600">Browse merchants, add services to cart, order work, and leave feedback from one central workspace.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/auth?mode=login" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition">Login to use cart</Link>
            <Link to="/auth?mode=register" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition">Create account</Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Merchant List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-white font-bold text-lg">Merchants ({merchants.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-6 flex items-center gap-3 text-gray-600"><LoaderCircle className="animate-spin" size={18} /> Loading merchants...</div>
                ) : merchants.length === 0 ? (
                  <div className="p-6 text-gray-600">No merchants found yet.</div>
                ) : merchants.map((merchant) => (
                  <button
                    key={merchant._id}
                    onClick={() => setSelectedMerchant(merchant)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedMerchant?._id === merchant._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{merchant.businessName}</h3>
                        <p className="text-sm text-gray-600 capitalize">{merchant.category}</p>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {merchant.services?.length || 0} services
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="lg:col-span-2">
            {selectedMerchant ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedMerchant.businessName}</h2>
                        <p className="text-white/90 capitalize">{selectedMerchant.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={20} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{Number(rating.avgRating || 0).toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Mail size={18} />
                        <span>{selectedMerchant.description || 'No description provided'}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <BadgeDollarSign size={18} />
                        <span>{activeServiceCount} services available</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Calendar size={18} />
                        <span>Created {selectedMerchant.createdAt ? new Date(selectedMerchant.createdAt).toLocaleDateString() : 'recently'}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <FileText size={18} />
                        <span>Total Reviews: {rating.totalReviews || 0}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MessageCircle size={18} />
                        <span>Support-ready client communication</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {(selectedMerchant.services || []).map((service) => (
                      <div key={service._id || service.name} className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-gray-600 mt-1">{service.description || 'Service details available on request.'}</p>
                            <p className="text-blue-600 font-semibold mt-2">{service.priceLabel || (service.price ? `Starting at ₹${service.price}` : 'Custom pricing')}</p>
                          </div>
                          <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                            <Sparkles size={16} />
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                          >
                            Learn More
                          </button>
                          <button
                            onClick={() => handleAddToCart(service._id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
                          >
                            <ShoppingCart size={16} /> Add to Cart
                          </button>
                          <button
                            onClick={() => openCheckout(service)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                          >
                            <CreditCard size={16} /> Buy Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmitReview} className="rounded-2xl border border-gray-200 p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck size={18} className="text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Leave a review</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                      <label className="block">
                        <span className="text-sm font-medium text-gray-700">Rating</span>
                        <select value={reviewForm.rating} onChange={(event) => setReviewForm((current) => ({ ...current, rating: event.target.value }))} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      </label>
                      <label className="md:col-span-2 block">
                        <span className="text-sm font-medium text-gray-700">Comment</span>
                        <input value={reviewForm.comment} onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="Tell others about this service..." />
                      </label>
                    </div>
                    <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                      <Send size={16} /> Submit Review
                    </button>
                  </form>

                  {actionMessage && <p className="mb-3 text-sm text-green-700">{actionMessage}</p>}
                  {actionError && <p className="mb-3 text-sm text-red-600">{actionError}</p>}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Reviews</h3>
                    <div className="space-y-3">
                      {reviews.length === 0 ? (
                        <p className="text-gray-600">No reviews yet for this merchant.</p>
                      ) : reviews.map((review) => (
                        <div key={review._id} className="rounded-xl bg-gray-50 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-900">{review.user?.name || 'Customer'}</p>
                            <span className="text-sm text-gray-600">{review.rating}/5</span>
                          </div>
                          <p className="text-gray-600">{review.comment || 'No comment provided.'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <User size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Merchant</h3>
                <p className="text-gray-600">Choose a merchant from the list to view services, reviews, and cart actions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {checkoutOpen && selectedMerchant && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">Secure checkout</p>
                <h3 className="mt-2 text-2xl font-bold">Pay for {selectedService.name}</h3>
                <p className="mt-2 text-sm text-slate-300">Complete your purchase through Razorpay checkout.</p>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20">
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-200">
                      <BadgeDollarSign size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Merchant</p>
                      <p className="font-semibold">{selectedMerchant.businessName}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                    <span className="text-slate-300">Service</span>
                    <span className="font-medium">{selectedService.name}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Amount</span>
                    <span className="text-xl font-bold text-emerald-300">₹{selectedService.price || 0}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 text-emerald-100">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={18} />
                    Secure payment flow
                  </div>
                  <p className="mt-2 text-sm text-emerald-50/90">
                    Your payment will be created on the backend and processed inside the Razorpay checkout popup.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">Payment methods</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-white/10 px-3 py-2 text-white/80">UPI</span>
                    <span className="rounded-full bg-white/10 px-3 py-2 text-white/80">Credit Card</span>
                    <span className="rounded-full bg-white/10 px-3 py-2 text-white/80">Debit Card</span>
                    <span className="rounded-full bg-white/10 px-3 py-2 text-white/80">Net Banking</span>
                    <span className="rounded-full bg-white/10 px-3 py-2 text-white/80">Wallets</span>
                  </div>
                </div>

                {paymentError && <p className="text-sm text-red-300">{paymentError}</p>}
                {paymentMessage && <p className="text-sm text-emerald-300">{paymentMessage}</p>}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/60">
                  <CreditCard size={16} /> Payment summary
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Service price</span>
                    <span className="font-semibold">₹{selectedService.price || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Processing fee</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-base">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold text-cyan-300">₹{selectedService.price || 0}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={paymentLoading}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {paymentLoading ? 'Opening checkout...' : 'Pay with Razorpay'}
                  <CreditCard size={18} />
                </button>

                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="mt-3 w-full rounded-2xl border border-white/10 px-4 py-3 font-semibold text-white/80 transition hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;