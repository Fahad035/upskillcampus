import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, TrendingUp, BadgeCheck, CreditCard, HeadphonesIcon, Workflow, ActivitySquare, BarChart3, Layers3, Sparkles, ChevronRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import StatsCounter from '../components/StatsCounter';

const Home = () => {
  const [activeSpotlight, setActiveSpotlight] = useState('operations');

  const features = [
    { icon: Shield, title: 'Secure Platform', description: 'Enterprise-grade security for client records, projects, and service access.' },
    { icon: Clock, title: 'Fast Delivery', description: 'Keep teams aligned with clear task flow, updates, and checkpoints.' },
    { icon: Users, title: 'Multi-Client Control', description: 'Manage several customers, service plans, and order streams in one place.' },
    { icon: TrendingUp, title: 'Insights', description: 'Use live metrics to understand performance, load, and growth trends.' },
  ];

  const spotlightMap = {
    operations: {
      title: 'Operations Control',
      description: 'Track active clients, assign work, and keep service delivery moving without jumping between tools.',
      icon: Workflow,
    },
    billing: {
      title: 'Billing and Orders',
      description: 'Support checkout, service pricing, and payment workflows that fit recurring client operations.',
      icon: BarChart3,
    },
    support: {
      title: 'Support and Retention',
      description: 'Handle communication, reviews, and updates with a smoother service experience for each client.',
      icon: ActivitySquare,
    },
  };

  const spotlightKeys = Object.keys(spotlightMap);
  const activePanel = spotlightMap[activeSpotlight];

  const stats = [
    { value: 1000, label: 'Active Clients', suffix: '+' },
    { value: 50, label: 'Expert Team', suffix: '+' },
    { value: 99.9, label: 'Uptime', suffix: '%' },
    { value: 24, label: 'Support Hours', suffix: '/7' },
  ];

  const essentials = [
    'Secure client accounts with role-based access',
    'Project, invoice, and support tracking in one workspace',
    'Fast communication across teams and clients',
    'Scalable foundation for multi-client service businesses',
  ];

  return (
    <div className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.10),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_42%,_#ffffff_100%)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.98)_0%,rgba(15,23,42,0.92)_38%,rgba(76,29,149,0.82)_100%)]" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.35),transparent_0_24%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.32),transparent_0_24%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.25),transparent_0_22%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg backdrop-blur-md">
              <Sparkles size={16} /> Built for multi-client services
            </div>
            <h1 className="mt-6 max-w-2xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              A sharper way to run client work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              A polished workspace for services, orders, billing, and support. Everything your team needs to manage many clients without losing speed or clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/auth?mode=register" className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-semibold text-slate-950 shadow-2xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-100">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20">
                Explore Services <ChevronRight size={18} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                'Client accounts and permissions',
                'Project, invoice, and support flow',
                'Live dashboard and review tracking',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-sm text-slate-200 shadow-lg backdrop-blur-md">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl lg:block" />
            <div className="absolute -right-3 bottom-8 hidden h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl lg:block" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/60">Workspace snapshot</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Multi-client control center</h2>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
                  Live status
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Revenue</p>
                  <div className="mt-2 flex items-end gap-3">
                    <span className="text-3xl font-black text-white">$47.9k</span>
                    <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs font-semibold text-emerald-300">+23%</span>
                  </div>
                  <div className="mt-4 h-24 rounded-xl bg-[linear-gradient(180deg,rgba(59,130,246,0.3),rgba(168,85,247,0.08))] p-4">
                    <div className="grid h-full grid-cols-7 items-end gap-2">
                      {[32, 60, 44, 72, 54, 84, 66].map((height) => (
                        <span key={height} className="rounded-full bg-gradient-to-t from-cyan-400 to-fuchsia-400" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/95 p-5 text-slate-950">
                  <p className="text-sm text-slate-500">This week</p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2.5">
                      <span>New clients</span>
                      <strong>18</strong>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2.5">
                      <span>Open tasks</span>
                      <strong>42</strong>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-2.5">
                      <span>Resolved tickets</span>
                      <strong>91%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
                <StatsCounter value={stat.value} label={stat.label} suffix={stat.suffix} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Why it works</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Structured for service teams, built to feel premium.</h2>
            <p className="mt-4 text-lg text-slate-600">
              The layout combines clarity, motion, and live-feeling panels so users immediately understand what the product does.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <ServiceCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-600">Interactive focus</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Switch between the core parts of the platform.</h2>
              <p className="mt-4 text-lg text-slate-600">
                This section makes the homepage feel alive and product-like, while still keeping the story focused on multi-client service management.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {spotlightKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSpotlight(key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeSpotlight === key ? 'bg-slate-950 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'}`}
                  >
                    {spotlightMap[key].title}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <activePanel.icon size={24} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Selected area</p>
                  <h3 className="text-2xl font-bold text-slate-950">{activePanel.title}</h3>
                </div>
              </div>

              <p className="mt-5 text-slate-600 leading-7">{activePanel.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
                  <p className="text-sm text-slate-400">Workflow</p>
                  <p className="mt-1 text-lg font-semibold">From intake to delivery</p>
                </div>
                <div className="rounded-2xl bg-blue-50 px-5 py-4 text-slate-950">
                  <p className="text-sm text-blue-600">Outcome</p>
                  <p className="mt-1 text-lg font-semibold">Clear client visibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_45%,#7c3aed_100%)] px-6 py-12 text-center text-white shadow-[0_25px_70px_rgba(15,23,42,0.16)] sm:px-10">
            <h2 className="text-3xl font-black sm:text-4xl">
            Ready to Transform Your Business?
          </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
              Move from scattered tools to one clean client management experience that looks modern and feels fast.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <Link to="/client-portal" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
                View Client Portal <Layers3 size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Essentials Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Built for multi-client teams</p>
              <h2 className="mb-4 text-3xl font-black text-slate-950 sm:text-4xl">Everything you need to run client work professionally</h2>
              <p className="mb-8 text-lg text-slate-600">
                The frontend is now aligned to the backend with auth-ready flows and service-focused sections for onboarding, operations, support, and reporting.
              </p>
              <div className="space-y-4">
                {essentials.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 text-blue-600" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                <CreditCard className="text-cyan-300 mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-2">Billing Ready</h3>
                <p className="text-slate-300">Designed for invoices, payments, and recurring service plans.</p>
              </div>
              <div className="rounded-[1.75rem] bg-blue-50 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <HeadphonesIcon className="text-blue-600 mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Support Friendly</h3>
                <p className="text-gray-600">Fast access to requests, updates, and communication logs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;