import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { CheckCircle2, ArrowRight, CreditCard, Download, PackageCheck, ReceiptText } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [downloadLoading, setDownloadLoading] = useState(false);

  const merchantName = searchParams.get('merchant') || location.state?.merchantName || 'Merchant';
  const serviceName = searchParams.get('service') || location.state?.serviceName || 'Service';
  const amount = searchParams.get('amount') || location.state?.amount || '0';
  const paymentId = searchParams.get('paymentId') || location.state?.paymentId || 'N/A';
  const orderId = searchParams.get('orderId') || location.state?.orderId || 'N/A';

  const handleDownloadReceipt = async () => {
    setDownloadLoading(true);
    try {
      const doc = new jsPDF();

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 297, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text('Service Invoice', 14, 20);

      doc.setFontSize(11);
      doc.text('Payment confirmed via Razorpay', 14, 30);

      doc.setDrawColor(255, 255, 255);
      doc.line(14, 36, 196, 36);

      doc.setFontSize(13);
      doc.text(`Merchant: ${merchantName}`, 14, 50);
      doc.text(`Service: ${serviceName}`, 14, 62);
      doc.text(`Amount: ₹${amount}`, 14, 74);
      doc.text(`Payment ID: ${paymentId}`, 14, 86);
      doc.text(`Order ID: ${orderId}`, 14, 98);
      doc.text(`Date: ${new Date().toLocaleString()}`, 14, 110);

      doc.setFontSize(10);
      doc.setTextColor(200, 200, 200);
      doc.text('This invoice was generated automatically from your successful checkout.', 14, 128);

      doc.save(`invoice-${paymentId || orderId}.pdf`);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="rounded-full bg-emerald-500/15 p-4 text-emerald-300">
          <CheckCircle2 size={56} />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-emerald-300/80">Payment successful</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Your service has been purchased</h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          We verified your Razorpay payment and saved the order. You can now track the purchase in your dashboard.
        </p>

        <div className="mt-10 grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-2xl sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 text-cyan-300"><CreditCard size={18} /> Amount</div>
            <p className="mt-2 text-2xl font-semibold">₹{amount}</p>
          </div>
          <div className="rounded-2xl bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 text-cyan-300"><PackageCheck size={18} /> Service</div>
            <p className="mt-2 text-lg font-semibold">{serviceName}</p>
          </div>
          <div className="rounded-2xl bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 text-cyan-300"><CheckCircle2 size={18} /> Merchant</div>
            <p className="mt-2 text-lg font-semibold">{merchantName}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
          Payment ID: <span className="font-medium text-white">{paymentId}</span>
        </div>

        <button
          onClick={handleDownloadReceipt}
          disabled={downloadLoading}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {downloadLoading ? <ReceiptText size={18} /> : <Download size={18} />} {downloadLoading ? 'Preparing PDF...' : 'Download PDF invoice'}
        </button>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-400/10"
          >
            View order details
          </button>
          <Link to="/client-portal" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:translate-y-[-1px]">
            Back to services <ArrowRight size={18} />
          </Link>
          <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/5">
            View dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;