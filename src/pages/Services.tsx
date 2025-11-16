import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    { title: 'Everyday Care', path: '/services/everyday-care', description: 'Regular laundry services for your daily needs' },
    { title: 'Delicates & Dry Clean', path: '/services/delicates-dry-clean', description: 'Special care for delicate fabrics' },
    { title: 'Home Care', path: '/services/home-care', description: 'Bedding, curtains, and household items' },
    { title: 'Specialty Services', path: '/services/specialty-services', description: 'Custom solutions for unique needs' },
    { title: 'Add-On Services', path: '/services/add-on-services', description: 'Extra services to enhance your experience' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Services</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Professional laundry services tailored to your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
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
