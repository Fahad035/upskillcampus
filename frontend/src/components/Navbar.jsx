import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, Users, LayoutDashboard, UserCircle, LogIn, UserPlus, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: Briefcase },
    { path: '/services', name: 'Services', icon: Users },
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/client-portal', name: 'Client Portal', icon: UserCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OmniClient
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            {token ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span>{userName || 'Account'}</span>
                </div>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth?mode=login" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600">
                  <LogIn size={16} />
                  Login
                </Link>
                <Link to="/auth?mode=register" className="btn-primary text-sm px-5 py-2 inline-flex items-center gap-2">
                  <UserPlus size={16} />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
                <Link to="/auth?mode=login" className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700 mt-4">
                  Login
                </Link>
                <Link to="/auth?mode=register" className="block w-full btn-primary text-center mt-3">
                  Get Started
                </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;