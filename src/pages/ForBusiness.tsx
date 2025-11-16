import { Link } from 'react-router-dom';

export default function ForBusiness() {
  const businessServices = [
    { title: 'Hotels & Hospitality', path: '/business/hotels-hospitality', description: 'Complete linen services for hotels' },
    { title: 'Restaurants & Cafes', path: '/business/restaurants-cafes', description: 'Table linens and uniforms' },
    { title: 'Corporate & Offices', path: '/business/corporate-offices', description: 'Professional cleaning for businesses' },
    { title: 'Government / Embassy', path: '/business/government-embassy', description: 'Trusted services for official institutions' },
    { title: 'Spa & Wellness', path: '/business/spa-wellness', description: 'Fresh towels and robes for wellness centers' },
    { title: 'Schools & Colleges', path: '/business/schools-colleges', description: 'Bulk laundry for educational institutions' },
    { title: 'Partners & Drop-Off Points', path: '/business/partners-drop-off', description: 'Become a partner location' },
    { title: 'Request a Corporate Quote', path: '/business/request-quote', description: 'Get a customized quote for your business' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Business Solutions</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Professional laundry services for businesses of all sizes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {businessServices.map((service) => (
          <Link
            key={service.path}
            to={service.path}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-ohana-mid-blue transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
