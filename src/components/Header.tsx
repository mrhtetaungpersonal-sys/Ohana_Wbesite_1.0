import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 ${isHomepage ? 'bg-white/90 backdrop-blur-sm' : 'bg-white shadow-sm'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img
              src="/Ohana Logo_no text.png"
              alt="Ohana Professional Laundry"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-ohana-deep-blue transition-colors">
              Home
            </Link>

            <Link to="/services" className="text-gray-800 hover:text-ohana-deep-blue transition-colors">
              Services
            </Link>

            <Link to="/pricing" className="text-gray-800 hover:text-ohana-deep-blue transition-colors">
              Pricing
            </Link>

            <Link to="/membership" className="text-gray-800 hover:text-ohana-deep-blue transition-colors">
              Membership
            </Link>

            <Link to="/business" className="text-gray-800 hover:text-ohana-deep-blue transition-colors">
              For Business
            </Link>
          </div>

          <div className="hidden lg:block">
            <a
              href="#book-now"
              className="bg-ohana-deep-blue text-white px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Book Now
            </a>
          </div>

          <button
            className="lg:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-800 hover:text-ohana-deep-blue">
              Home
            </Link>
            <Link to="/services" className="block py-2 text-gray-800 hover:text-ohana-deep-blue">
              Services
            </Link>
            <Link to="/pricing" className="block py-2 text-gray-800 hover:text-ohana-deep-blue">
              Pricing
            </Link>
            <Link to="/membership" className="block py-2 text-gray-800 hover:text-ohana-deep-blue">
              Membership
            </Link>
            <Link to="/business" className="block py-2 text-gray-800 hover:text-ohana-deep-blue">
              For Business
            </Link>
            <a
              href="#book-now"
              className="block mt-4 bg-ohana-deep-blue text-white px-6 py-2.5 rounded-lg text-center hover:bg-opacity-90"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
