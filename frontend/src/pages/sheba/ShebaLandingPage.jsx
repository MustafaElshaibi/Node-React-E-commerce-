import { ArrowRight, Check, Zap, Shield, Lock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShebaLandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sheba: Unified Government Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Your single gateway to all government ministries and services. Secure, fast, and designed for citizens.
            </p>
            <Link to="/sheba/services" className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold text-emerald-700">2.5M+</div>
              <div className="text-gray-600 dark:text-gray-400">Citizens Served</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold text-teal-600">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Services</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold text-amber-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Sheba?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure', desc: 'Bank-level encryption' },
              { icon: Zap, title: 'Fast', desc: 'Instant verification' },
              { icon: Lock, title: 'Private', desc: 'Your data protected' },
              { icon: Users, title: 'Unified', desc: 'One digital identity' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <Icon className="w-8 h-8 text-emerald-700 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Government Ministries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Connected Ministries
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Interior', services: '12 Services' },
              { name: 'Health', services: '8 Services' },
              { name: 'Education', services: '15 Services' },
              { name: 'Commerce', services: '10 Services' },
              { name: 'Transportation', services: '7 Services' },
              { name: 'Justice', services: '9 Services' },
            ].map((ministry, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{ministry.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ministry.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Popular Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Vehicle Registration', time: '2-3 days', fee: 'Free' },
              { name: 'Passport Renewal', time: '5-7 days', fee: 'AED 200' },
              { name: 'Business License', time: '1-2 weeks', fee: 'AED 500' },
              { name: 'Health Insurance', time: 'Instant', fee: 'Free' },
              { name: 'School Enrollment', time: '3-5 days', fee: 'Free' },
              { name: 'Tax Filing', time: '2-3 days', fee: 'Free' },
            ].map((service, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{service.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>⏱ {service.time}</p>
                  <p>💰 {service.fee}</p>
                </div>
                <button className="mt-4 w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded py-2 font-semibold transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-700 dark:bg-emerald-900">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">Access all government services with one secure digital identity.</p>
          <Link to="/sheba/services" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-emerald-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Browse All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
