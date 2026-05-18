import { Code, Cloud, Shield, Database, Smartphone, BarChart, Mail, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: Code, title: 'Custom Development', description: 'Tailored solutions built to your exact specifications', price: 'Starting at $500' },
    { icon: Cloud, title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and deployment', price: 'Starting at $300/mo' },
    { icon: Shield, title: 'Security Services', description: 'Advanced security audits and protection', price: 'Starting at $200/mo' },
    { icon: Database, title: 'Data Analytics', description: 'Comprehensive data analysis and insights', price: 'Starting at $400/mo' },
    { icon: Smartphone, title: 'Mobile Apps', description: 'Cross-platform mobile applications', price: 'Starting at $2000' },
    { icon: BarChart, title: 'SEO Optimization', description: 'Boost your search engine rankings', price: 'Starting at $250/mo' },
    { icon: Mail, title: 'Email Marketing', description: 'Automated marketing campaigns', price: 'Starting at $150/mo' },
    { icon: Globe, title: 'Web Hosting', description: 'Fast and reliable hosting solutions', price: 'Starting at $50/mo' },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-blue-600 font-semibold mb-4">{service.price}</p>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;