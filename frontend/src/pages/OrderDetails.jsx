import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Calendar, CreditCard, LoaderCircle, MapPin, ReceiptText, User } from 'lucide-react';
import { getOrderById } from '../api/marketplace';

const OrderDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (fetchError) {
        setError(fetchError?.response?.data?.msg || 'Unable to load order details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOrder();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">Order details</p>
              <h1 className="mt-2 text-3xl font-bold">{loading ? 'Loading order...' : order?.service?.name || 'Service order'}</h1>
            </div>
            {order?.status && (
              <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
                {order.status}
              </span>
            )}
          </div>

          {loading ? (
            <div className="mt-8 flex items-center gap-3 text-slate-300">
              <LoaderCircle className="animate-spin" size={18} /> Loading order data...
            </div>
          ) : error ? (
            <p className="mt-8 text-red-300">{error}</p>
          ) : order ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300"><ReceiptText size={20} /></div>
                  <div>
                    <p className="text-sm text-slate-400">Service</p>
                    <h2 className="text-xl font-semibold">{order.service?.name}</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Merchant</p>
                    <p className="mt-2 font-semibold">{order.merchant?.businessName || 'Merchant'}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Customer</p>
                    <p className="mt-2 font-semibold">{order.customer?.name || 'Customer'}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Amount</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-300">₹{order.service?.price || 0}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Created</p>
                    <p className="mt-2 font-semibold">{order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
                <div className="flex items-center gap-3 text-slate-300"><CreditCard size={18} /> Payment info</div>
                <div className="rounded-2xl bg-slate-900/70 p-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400"><BadgeCheck size={16} /> Payment ID</div>
                  <p className="mt-2 break-all font-medium text-white">{order.payment?.paymentId || '—'}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400"><MapPin size={16} /> Order ID</div>
                  <p className="mt-2 break-all font-medium text-white">{order.payment?.orderId || '—'}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400"><User size={16} /> Email</div>
                  <p className="mt-2 break-all font-medium text-white">{order.customer?.email || '—'}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/70 p-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400"><Calendar size={16} /> Status</div>
                  <p className="mt-2 break-all font-medium text-white">{order.status || 'pending'}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;