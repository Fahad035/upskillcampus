import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Settings, Bell, ShoppingBag, ClipboardList, Building2, ShieldCheck } from 'lucide-react';
import { getCart, getMerchants, getMyOrders } from '../api/marketplace';
import { getProfile } from '../api/auth';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const [profileResponse, ordersResponse, cartResponse, merchantsResponse] = await Promise.allSettled([
          getProfile(),
          getMyOrders(),
          getCart(),
          getMerchants(),
        ]);

        if (profileResponse.status === 'fulfilled') {
          setProfile(profileResponse.value.data);
        }

        if (ordersResponse.status === 'fulfilled') {
          setOrders(Array.isArray(ordersResponse.value.data) ? ordersResponse.value.data : []);
        }

        if (cartResponse.status === 'fulfilled') {
          setCart(cartResponse.value.data || { items: [] });
        }

        if (merchantsResponse.status === 'fulfilled') {
          setMerchants(Array.isArray(merchantsResponse.value.data) ? merchantsResponse.value.data : []);
        }

        if (profileResponse.status === 'rejected' && ordersResponse.status === 'rejected') {
          setError('Sign in to load your live dashboard data.');
        }
      } catch {
        setError('Unable to load dashboard data right now.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const dashboardStats = useMemo(() => {
    const totalServices = merchants.reduce((count, merchant) => count + (merchant.services?.length || 0), 0);
    const pendingOrders = orders.filter((order) => order.status === 'pending').length;
    const completedOrders = orders.filter((order) => order.status === 'completed').length;

    return [
      { icon: Building2, label: 'Merchants', value: merchants.length, change: 'Live', color: 'bg-blue-500' },
      { icon: ClipboardList, label: 'Orders', value: orders.length, change: `${pendingOrders} pending`, color: 'bg-green-500' },
      { icon: ShoppingBag, label: 'Cart Items', value: cart.items?.length || 0, change: 'Ready to checkout', color: 'bg-purple-500' },
      { icon: ShieldCheck, label: 'Completed', value: completedOrders, change: 'Fulfilled', color: 'bg-orange-500' },
      { icon: Activity, label: 'Services', value: totalServices, change: 'Active catalog', color: 'bg-slate-700' },
      { icon: TrendingUp, label: 'Role', value: profile?.role || 'customer', change: profile?.id ? 'Authenticated' : 'Guest', color: 'bg-cyan-600' },
    ];
  }, [cart.items, merchants, orders, profile]);

  const recentActivities = orders.slice(0, 6).map((order) => ({
    id: order._id,
    client: order.merchant?.businessName || 'Merchant',
    project: order.service?.name || 'Service',
    status: order.status,
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—',
    amount: order.service?.price ?? 0,
    paymentId: order.payment?.paymentId || order.payment?.orderId || '—',
  }));

  const quickMerchantCards = merchants.slice(0, 3);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!profile?.id && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-blue-800 shadow-sm">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold">Sign in to unlock live data</p>
                <p className="text-sm text-blue-700/90">Your orders, cart, and client activity load from the backend after login.</p>
              </div>
              <Link to="/auth?mode=login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Go to Login
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">{profile?.id ? `Welcome back, ${localStorage.getItem('userName') || 'user'}!` : 'Live multi-client overview'}</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <Bell size={20} />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.slice(0, 4).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-green-600 font-semibold">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {quickMerchantCards.map((merchant) => (
            <div key={merchant._id} className="bg-white rounded-xl shadow-sm p-6 card-hover">
              <p className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-[0.2em]">{merchant.category || 'other'}</p>
              <h3 className="text-xl font-bold text-gray-900">{merchant.businessName}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{merchant.description || 'No description available yet.'}</p>
              <div className="mt-4 text-sm text-gray-500">{merchant.services?.length || 0} services available</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap gap-4 px-6">
              {['overview', 'clients', 'projects', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {loading && <p className="text-gray-600">Loading live backend data...</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {activeTab === 'overview' && !loading && (
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                  <p className="text-sm text-gray-500">Paid orders from the backend with service and payment details</p>
                </div>
                {recentActivities.length === 0 ? (
                  <p className="text-gray-600">No orders yet. Create one from the client portal after logging in.</p>
                ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {recentActivities.map((activity, index) => (
                    <Link key={index} to={`/orders/${activity.id}`} className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">{activity.client}</p>
                          <h3 className="mt-2 text-lg font-bold text-gray-900">{activity.project}</h3>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activity.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : activity.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                          {activity.status}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Amount</p>
                          <p className="mt-1 font-semibold text-gray-900">₹{activity.amount}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-3">
                          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">Date</p>
                          <p className="mt-1 font-semibold text-gray-900">{activity.date}</p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl bg-slate-950 p-3 text-white">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/60">Payment ID</p>
                        <p className="mt-1 break-all text-sm font-medium text-white/90">{activity.paymentId}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                )}
              </div>
            )}

            {activeTab === 'clients' && !loading && (
              <div>
                <h2 className="text-xl font-bold mb-4">Backend Snapshot</h2>
                <p className="text-gray-600 mb-4">Cart items: {cart.items?.length || 0}. Merchants: {merchants.length}. Profile role: {profile?.role || 'guest'}.</p>
                <p className="text-gray-600">Use the client portal to browse merchants and add services to the live cart.</p>
              </div>
            )}

            {activeTab === 'projects' && !loading && (
              <div>
                <h2 className="text-xl font-bold mb-4">Service Catalog</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {merchants.flatMap((merchant) => (merchant.services || []).map((service) => (
                    <div key={`${merchant._id}-${service._id || service.name}`} className="rounded-xl border border-gray-200 p-4">
                      <p className="text-sm text-blue-600 font-semibold">{merchant.businessName}</p>
                      <h3 className="font-bold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600">{service.price ? `$${service.price}` : 'Custom pricing'}</p>
                    </div>
                  ))).slice(0, 6)}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && !loading && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-950 p-6 text-white">
                  <p className="text-white/60 text-sm uppercase tracking-[0.2em]">Orders</p>
                  <div className="mt-2 text-4xl font-bold">{orders.length}</div>
                  <p className="mt-2 text-white/70">Orders currently stored in the backend.</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-6 text-gray-900">
                  <p className="text-blue-600 text-sm uppercase tracking-[0.2em] font-semibold">Merchants</p>
                  <div className="mt-2 text-4xl font-bold">{merchants.length}</div>
                  <p className="mt-2 text-gray-600">Businesses and service catalogs available in the system.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;