import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">OmniClient</h3>
            <p className="text-slate-400 mb-6 leading-7">
              A full client-management workspace for teams handling leads, projects, payments, feedback, and support in one place.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition hover:border-blue-500 hover:text-blue-400">
                <FaFacebookF size={16} />
              </a>
              <a href="https://x.com/MdFahad1362761" aria-label="X" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition hover:border-slate-200 hover:text-white">
                <FaXTwitter size={16} />
              </a>
              <a href="https://www.linkedin.com/in/md-fahad-71505a2b6" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition hover:border-sky-500 hover:text-sky-400">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition hover:border-pink-500 hover:text-pink-400">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/services" className="hover:text-white transition inline-flex items-center gap-2">Services <ArrowRight size={14} /></Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition inline-flex items-center gap-2">Dashboard <ArrowRight size={14} /></Link></li>
              <li><Link to="/client-portal" className="hover:text-white transition inline-flex items-center gap-2">Client Portal <ArrowRight size={14} /></Link></li>
              <li><Link to="/auth?mode=register" className="hover:text-white transition inline-flex items-center gap-2">Signup <ArrowRight size={14} /></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Billing & Orders</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
              <li><a href="#" className="hover:text-white transition">Service Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>1-11-50 Begumpet Hyderabad India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 799 525 1073</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@omniclient.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400">
          <p>&copy; 2026 OmniClient. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;