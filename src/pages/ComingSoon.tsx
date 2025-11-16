import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <img
          src="/Ohana Logo_no text.png"
          alt="Ohana Professional Laundry"
          className="h-24 w-auto mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We're working hard to bring you something special. Check back soon!
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-ohana-deep-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
