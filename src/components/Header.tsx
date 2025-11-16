import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isHomepage ? 'pt-6 px-4 sm:px-6 lg:px-12' : 'pt-4 px-4 sm:px-6 lg:px-12'
      }`}
    >
      <nav
        className={`mx-auto bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500 ease-out ${
          isScrolled
            ? 'max-w-[1200px] rounded-[28px] py-3'
            : 'max-w-[1280px] rounded-[32px] py-4'
        }`}
        style={{
          boxShadow: isScrolled
            ? '0 10px 40px rgba(0, 0, 0, 0.12)'
            : '0 12px 48px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/Ohana Logo_no text.png"
                alt="Ohana Professional Laundry"
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
              />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-ohana-deep-blue transition-colors font-medium"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="text-gray-700 hover:text-ohana-deep-blue transition-colors font-medium"
              >
                Services
              </Link>

              <Link
                to="/pricing"
                className="text-gray-700 hover:text-ohana-deep-blue transition-colors font-medium"
              >
                Pricing
              </Link>

              <Link
                to="/membership"
                className="text-gray-700 hover:text-ohana-deep-blue transition-colors font-medium"
              >
                Membership
              </Link>

              <Link
                to="/business"
                className="text-gray-700 hover:text-ohana-deep-blue transition-colors font-medium"
              >
                For Business
              </Link>
            </div>

            <div className="hidden lg:block">
              <a
                href="#book-now"
                className={`bg-ohana-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-medium ${
                  isScrolled ? 'px-5 py-2' : 'px-6 py-2.5'
                }`}
              >
                Book Now
              </a>
            </div>

            <button
              className="lg:hidden text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pt-4 pb-2 space-y-2 border-t border-gray-100 mt-4">
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-ohana-deep-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block py-2 text-gray-700 hover:text-ohana-deep-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="block py-2 text-gray-700 hover:text-ohana-deep-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/membership"
                className="block py-2 text-gray-700 hover:text-ohana-deep-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/business"
                className="block py-2 text-gray-700 hover:text-ohana-deep-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Business
              </Link>
              <a
                href="#book-now"
                className="block mt-4 bg-ohana-deep-blue text-white px-6 py-2.5 rounded-lg text-center hover:bg-opacity-90 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
