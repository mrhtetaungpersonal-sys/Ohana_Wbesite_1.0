import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('ohanaWelcomeShown');

    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('ohanaWelcomeShown', 'true');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-ohana-deep-blue mb-4">
            Welcome to Ohana! Enjoy Your First-Time Offer
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Get 1 free garment (Wash & Fold) + 50% off your first service voucher as our welcome gift.
          </p>

          <a
            href="#claim-offer"
            onClick={handleClose}
            className="inline-block bg-ohana-mid-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-ohana-soft-blue transition-all hover:shadow-lg"
          >
            Claim My Offer
          </a>
        </div>
      </div>
    </div>
  );
}
