import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import ClientPortal from './pages/ClientPortal';
import Auth from './pages/Auth';
import PaymentSuccess from './pages/PaymentSuccess';
import OrderDetails from './pages/OrderDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-portal" element={<ClientPortal />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;