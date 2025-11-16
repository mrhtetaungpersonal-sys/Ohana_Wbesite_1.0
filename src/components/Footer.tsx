import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16 lg:mt-24" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="mx-4 sm:mx-6 lg:mx-12 xl:mx-auto py-12" style={{ maxWidth: '1440px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faqs" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-700 hover:text-ohana-deep-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-gray-700">
                  <p className="font-medium">Address</p>
                  <p className="text-sm mt-1">Your business address here</p>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-ohana-mid-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-ohana-mid-blue mr-2 flex-shrink-0" />
                <span className="text-gray-700">info@ohana.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-ohana-mid-blue transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-ohana-mid-blue transition-colors">
                  <Phone className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-ohana-mid-blue transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-500 hover:text-ohana-mid-blue transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Ohana Professional Laundry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
