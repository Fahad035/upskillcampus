import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react';
import { loginUser, registerUser, forgotPassword, resetPassword } from '../api/auth';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState(() => (searchParams.get('mode') === 'register' ? 'register' : searchParams.get('mode') === 'reset' ? 'reset' : 'login'));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [resetPasswordValue, setResetPasswordValue] = useState('');
  const [resetConfirmValue, setResetConfirmValue] = useState('');

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'register') {
        await registerUser(formData);
        setMessage('Account created. You can log in now.');
        setMode('login');
        return;
      }

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', formData.email.split('@')[0]);
      localStorage.setItem('userEmail', formData.email);
      setMessage('Login successful. Redirecting...');
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (authError) {
      setError(authError?.response?.data?.msg || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    try {
      await forgotPassword({ email: forgotEmail });
      setForgotMessage('If that email exists, a reset link has been sent.');
    } catch (err) {
      setForgotError(err?.response?.data?.msg || 'Unable to process request.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const token = searchParams.get('token');
    if (!token) return setError('Invalid or missing token.');
    if (!resetPasswordValue || resetPasswordValue !== resetConfirmValue) return setError('Passwords do not match.');
    try {
      await resetPassword(token, { password: resetPasswordValue });
      setMessage('Password reset successful. You can now login.');
      setMode('login');
    } catch (err) {
      setError(err?.response?.data?.msg || 'Reset failed.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.25),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-sm backdrop-blur">
              <Sparkles size={16} /> Secure client workspace
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Access client dashboards, project updates, billing, and support workflows with a modern glassmorphism interface built for multi-client services.
            </p>

            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              {['JWT auth integration', 'Role-based user setup', 'Dashboard-ready structure', 'Mobile-friendly onboarding'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3 text-slate-100">
                    <CheckCircle2 className="text-emerald-400" size={18} />
                    <span className="font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="glass-panel rounded-[2rem] border border-white/15 p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/70">Authentication</p>
                  <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{mode === 'login' ? 'Sign in to continue' : 'Register a new account'}</h2>
                </div>
                <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
                  <LockKeyhole size={24} />
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`rounded-xl px-4 py-3 font-semibold transition ${mode === 'login' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/80 hover:text-white'}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`rounded-xl px-4 py-3 font-semibold transition ${mode === 'register' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/80 hover:text-white'}`}
                >
                  Register
                </button>
              </div>

              {mode === 'reset' ? (
                <form onSubmit={handleResetSubmit} className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/80">New password</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                      <LockKeyhole size={18} className="text-white/70" />
                      <input
                        type="password"
                        value={resetPasswordValue}
                        onChange={(e) => setResetPasswordValue(e.target.value)}
                        placeholder="New password"
                        className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/80">Confirm password</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                      <LockKeyhole size={18} className="text-white/70" />
                      <input
                        type="password"
                        value={resetConfirmValue}
                        onChange={(e) => setResetConfirmValue(e.target.value)}
                        placeholder="Confirm password"
                        className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                        required
                      />
                    </div>
                  </label>

                  {error && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                      <AlertCircle size={18} className="mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {message && (
                    <div className="flex items-start gap-3 rounded-2xl border border-green-400/30 bg-green-500/15 px-4 py-3 text-sm text-green-100">
                      <CheckCircle2 size={18} className="mt-0.5" />
                      <span>{message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-xl transition hover:translate-y-[-1px]"
                  >
                    Reset password
                    <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/80">Full name</span>
                      <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                        <UserRound size={18} className="text-white/70" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={updateField('name')}
                          placeholder="Your name"
                          className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                          required
                        />
                      </div>
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/80">Email</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                      <Mail size={18} className="text-white/70" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={updateField('email')}
                        placeholder="you@example.com"
                        className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/80">Password</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                      <LockKeyhole size={18} className="text-white/70" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={updateField('password')}
                        placeholder="Enter password"
                        className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-white/70 transition hover:text-white">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>

                  {mode === 'register' && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/80">Account type</span>
                      <select
                        value={formData.role}
                        onChange={updateField('role')}
                        className="w-full rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 text-white outline-none backdrop-blur"
                      >
                        <option value="customer" className="text-slate-900">Customer</option>
                        <option value="merchant" className="text-slate-900">Merchant</option>
                        <option value="admin" className="text-slate-900">Admin</option>
                      </select>
                    </label>
                  )}

                  {error && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-100">
                      <AlertCircle size={18} className="mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {message && (
                    <div className="flex items-start gap-3 rounded-2xl border border-green-400/30 bg-green-500/15 px-4 py-3 text-sm text-green-100">
                      <CheckCircle2 size={18} className="mt-0.5" />
                      <span>{message}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {mode === 'login' && (
                      <button type="button" onClick={() => setShowForgot((s) => !s)} className="text-sm text-white/70 hover:text-white">
                        Forgot password?
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 shadow-xl transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? 'Please wait...' : mode === 'login' ? 'Login to Dashboard' : 'Create Account'}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </div>

                  {showForgot && (
                    <form onSubmit={handleForgotSubmit} className="space-y-3">
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-white/80">Email to reset</span>
                        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 backdrop-blur">
                          <Mail size={18} className="text-white/70" />
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-transparent text-white placeholder:text-slate-400 outline-none"
                            required
                          />
                        </div>
                      </label>
                      {forgotError && <div className="text-sm text-red-400">{forgotError}</div>}
                      {forgotMessage && <div className="text-sm text-emerald-300">{forgotMessage}</div>}
                      <button type="submit" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium">Send reset link</button>
                    </form>
                  )}
                </form>
              )}

              <div className="mt-6 text-center text-sm text-white/70">
                <Link to="/" className="hover:text-white transition">Back to home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;