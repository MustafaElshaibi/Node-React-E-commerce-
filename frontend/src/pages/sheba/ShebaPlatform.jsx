import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  Bell,
  User,
  Home,
  FileText,
  Calendar,
  DollarSign,
  MessageSquare,
  QrCode,
  Smartphone,
  Eye,
  EyeOff,
  Filter,
  Clock,
  TrendingUp,
  Star,
  MapPin,
  Phone,
  Mail,
  Heart,
  CreditCard,
  Settings
} from 'lucide-react';

const ShebaPlatform = () => {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const bgClass = isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900';
  const cardClass = isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200';
  const inputClass = isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900';

  const services = [
    { id: 1, name: 'Vehicle Registration', ministry: 'Transportation', time: '2-3 days', fee: 'Free', status: 'Available', icon: '🚗' },
    { id: 2, name: 'Passport Renewal', ministry: 'Interior', time: '5-7 days', fee: 'AED 200', status: 'Available', icon: '📕' },
    { id: 3, name: 'Business License', ministry: 'Commerce', time: '3-5 days', fee: 'AED 500', status: 'Available', icon: '🏢' },
    { id: 4, name: 'Health Insurance', ministry: 'Health', time: 'Instant', fee: 'Free', status: 'Available', icon: '🏥' },
    { id: 5, name: 'School Enrollment', ministry: 'Education', time: '1-2 days', fee: 'Free', status: 'Available', icon: '🎓' },
    { id: 6, name: 'Tax Filing', ministry: 'Finance', time: '2-4 days', fee: 'Free', status: 'Available', icon: '💰' },
  ];

  const ministries = [
    { name: 'Interior', icon: '🛡️', services: 12 },
    { name: 'Health', icon: '⚕️', services: 8 },
    { name: 'Education', icon: '📚', services: 15 },
    { name: 'Commerce', icon: '🏢', services: 10 },
    { name: 'Transportation', icon: '🚗', services: 7 },
    { name: 'Justice', icon: '⚖️', services: 9 },
  ];

  const walletCards = [
    { type: 'National ID', color: 'from-blue-600 to-blue-800', status: 'Valid', expiry: '2029-12-31' },
    { type: 'Driving License', color: 'from-emerald-600 to-emerald-800', status: 'Valid', expiry: '2026-08-15' },
    { type: 'Health Insurance', color: 'from-amber-600 to-amber-800', status: 'Valid', expiry: '2024-12-31' },
    { type: 'Residency Permit', color: 'from-purple-600 to-purple-800', status: 'Valid', expiry: '2027-03-20' },
  ];

  const requestsTimeline = [
    { id: 1, service: 'Business License', status: 'completed', date: '2024-05-20', days: 'Completed' },
    { id: 2, service: 'Vehicle Registration', status: 'approved', date: '2024-05-18', days: 'Approved' },
    { id: 3, service: 'Health Insurance Update', status: 'under_review', date: '2024-05-15', days: 'Under Review' },
    { id: 4, service: 'Passport Renewal', status: 'submitted', date: '2024-05-10', days: 'Submitted' },
  ];

  const notifications = [
    { id: 1, title: 'Business License Approved', msg: 'Your business license application has been approved', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Document Uploaded', msg: 'Your health insurance document was successfully uploaded', time: '5 hours ago', type: 'info' },
    { id: 3, title: 'Appointment Reminder', msg: 'Your driving test is scheduled for tomorrow at 10:00 AM', time: '1 day ago', type: 'warning' },
  ];

  // Hero Section
  const HeroSection = () => (
    <section className={`${bgClass} pt-32 pb-24 px-4 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-emerald-50/20 dark:from-blue-950/20 dark:to-emerald-950/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Sheba
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Your Unified Gateway to All Government Services
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            One secure digital identity. Complete access to all national services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: '👥', label: '2.5M+ Citizens', value: 'Active Users' },
            { icon: '✅', label: '500K+', value: 'Services Completed' },
            { icon: '⚡', label: '24/7', value: 'Available' },
          ].map((stat, i) => (
            <div key={i} className={`${cardClass} rounded-2xl p-8 border backdrop-blur-sm`}>
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.label}</div>
              <div className="text-gray-600 dark:text-gray-400">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
        >
          Get Started <ArrowRight className="inline ml-2 w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Why Choose Sheba</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: 'Bank-Level Security', desc: 'Military-grade encryption protects your data' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Instant verification and processing' },
            { icon: Lock, title: 'Private & Safe', desc: 'Your information stays private' },
            { icon: CheckCircle, title: 'One Identity', desc: 'Access all services with one login' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`${cardClass} rounded-2xl p-8 border backdrop-blur-sm`}
            >
              <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Ministry Integration Section
  const MinistrySection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Government Ministries</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-16 text-lg">Connected through Sheba's unified platform</p>
        
        <div className="grid md:grid-cols-6 gap-6 mb-16">
          {ministries.map((ministry, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`${cardClass} rounded-xl p-6 border text-center cursor-pointer backdrop-blur-sm hover:shadow-lg transition-all`}
            >
              <div className="text-4xl mb-3">{ministry.icon}</div>
              <h3 className="font-bold mb-1">{ministry.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{ministry.services} Services</p>
            </motion.div>
          ))}
        </div>

        <div className={`${cardClass} rounded-2xl p-12 border backdrop-blur-sm`}>
          <h3 className="text-2xl font-bold mb-8 text-center">Platform Architecture</h3>
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 mb-4`}>
                <User className="w-12 h-12 mx-auto text-blue-600" />
              </div>
              <p className="font-semibold">Citizen</p>
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400" />
            <div className="text-center flex-1">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 mb-4`}>
                <Lock className="w-12 h-12 mx-auto text-emerald-600" />
              </div>
              <p className="font-semibold">Sheba Gateway</p>
            </div>
            <ArrowRight className="w-8 h-8 text-gray-400" />
            <div className="text-center flex-1">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 mb-4`}>
                <Home className="w-12 h-12 mx-auto text-amber-600" />
              </div>
              <p className="font-semibold">Ministry Systems</p>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Secure identity federation, API orchestration, and real-time notifications
          </p>
        </div>
      </div>
    </section>
  );

  // Services Section
  const ServicesSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Government Services</h2>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className={`flex-1 flex items-center ${inputClass} border rounded-lg px-4`}>
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${bgClass} border-0 outline-none w-full ml-3 py-3`}
            />
          </div>
          <button className={`${inputClass} border rounded-lg px-6 py-3 font-semibold hover:shadow-lg transition-all`}>
            <Filter className="w-5 h-5 inline mr-2" />
            Filter
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services
            .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedService(service)}
                className={`${cardClass} rounded-xl p-6 border cursor-pointer backdrop-blur-sm hover:shadow-lg transition-all`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.ministry}</p>
                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {service.time}</span>
                  <span className="font-semibold text-emerald-600">{service.fee}</span>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  {service.status}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );

  // Digital Wallet Section
  const WalletSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Digital Wallet</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {walletCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ rotateY: 10, scale: 1.02 }}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-8 text-white relative h-64 flex flex-col justify-between overflow-hidden cursor-pointer`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="text-sm font-semibold opacity-75 mb-2">SHEBA</div>
                <div className="text-2xl font-bold">{card.type}</div>
              </div>
              <div className="relative z-10">
                <div className="text-xs opacity-75 mb-2">Status</div>
                <div className="text-lg font-semibold">{card.status}</div>
                <div className="text-xs opacity-75 mt-2">Expires: {card.expiry}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Dashboard Section
  const DashboardSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Citizen Dashboard</h2>
        
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FileText, label: 'Active Services', value: '3', color: 'blue' },
            { icon: Clock, label: 'Pending', value: '2', color: 'amber' },
            { icon: Calendar, label: 'Appointments', value: '1', color: 'emerald' },
            { icon: FileText, label: 'Documents', value: '12', color: 'purple' },
          ].map((item, i) => (
            <div key={i} className={`${cardClass} rounded-xl p-6 border`}>
              <item.icon className={`w-8 h-8 text-${item.color}-600 mb-3`} />
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
              <div className="text-3xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 ${cardClass} rounded-2xl p-8 border`}>
            <h3 className="text-2xl font-bold mb-6">Request Timeline</h3>
            <div className="space-y-4">
              {requestsTimeline.map((req, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    req.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900' :
                    req.status === 'approved' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-amber-100 dark:bg-amber-900'
                  }`}>
                    {req.status === 'completed' && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                    {req.status === 'approved' && <CheckCircle className="w-6 h-6 text-blue-600" />}
                    {req.status === 'submitted' && <Clock className="w-6 h-6 text-amber-600" />}
                    {req.status === 'under_review' && <Clock className="w-6 h-6 text-amber-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{req.service}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{req.date}</div>
                  </div>
                  <div className="text-right font-semibold">{req.days}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className={`${cardClass} rounded-2xl p-6 border mb-6`}>
              <h3 className="font-bold mb-4 flex items-center"><Bell className="w-5 h-5 mr-2" /> Notifications</h3>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <p className="font-semibold text-sm mb-1">{notif.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{notif.msg}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Mobile App Section
  const MobileSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Sheba Mobile Super App</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Access Sheba Anywhere</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Download our native mobile app for instant access to all government services, with biometric authentication and QR verification.
            </p>
            <ul className="space-y-4">
              {[
                'Biometric login (Face ID / Fingerprint)',
                'QR code verification',
                'Offline document access',
                'Push notifications',
                'Native performance'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <button className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> App Store
              </button>
              <button className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> Google Play
              </button>
            </div>
          </div>
          <div className={`${cardClass} rounded-3xl p-8 border h-96 flex items-center justify-center`}>
            <Smartphone className="w-32 h-32 text-gray-400 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );

  // AI Assistant Section
  const AIAssistantSection = () => (
    <section className={`${bgClass} py-24 px-4`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Sheba AI Assistant</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`${cardClass} rounded-3xl p-8 border h-96 flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-4 w-3/4`}>
                <p className="text-sm">What documents do I need for a business license?</p>
              </div>
              <div className="bg-emerald-600 text-white rounded-lg p-4 w-full">
                <p className="text-sm">You'll need: Trade License application, CRO certificate, Passport copy, Visa copy...</p>
              </div>
            </div>
            <div className={`flex gap-2 ${inputClass} border rounded-lg p-3`}>
              <input type="text" placeholder="Ask me anything..." className={`${bgClass} border-0 outline-none flex-1`} />
              <button className="text-emerald-600">→</button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Get Instant Answers</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our AI assistant answers questions about government services, eligibility requirements, and processing times 24/7.
            </p>
            <div className="space-y-4">
              {[
                { q: 'Service eligibility', desc: 'Check if you qualify for a service' },
                { q: 'Document requirements', desc: 'Get required documents list' },
                { q: 'Processing status', desc: 'Track your application status' },
                { q: 'Fee information', desc: 'Understand costs and payments' }
              ].map((item, i) => (
                <div key={i} className={`${cardClass} rounded-lg p-4 border`}>
                  <p className="font-semibold">{item.q}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Footer Section
  const FooterSection = () => (
    <footer className={`${cardClass} border-t py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="font-bold mb-4">Sheba</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your unified gateway to government services</p>
          </div>
          {[
            { title: 'Services', items: ['Search', 'Apply', 'Track', 'Support'] },
            { title: 'About', items: ['Privacy', 'Security', 'FAQ', 'Contact'] },
            { title: 'Ministries', items: ['Interior', 'Health', 'Education', 'Commerce'] },
            { title: 'Resources', items: ['Help', 'Guides', 'API Docs', 'Blog'] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-bold mb-4">{col.title}</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {col.items.map((item, j) => (
                  <li key={j} className="hover:text-gray-900 dark:hover:text-white cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Sheba. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // Main Navbar
  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
      <nav className={`sticky top-0 z-50 ${cardClass} border-b backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Sheba</h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="hover:text-emerald-600 transition-colors">Platform</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Security</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg ${cardClass} border hover:shadow-lg transition-all`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="hidden md:block bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              Login
            </button>
          </div>
        </div>
      </nav>

      <HeroSection />
      <FeaturesSection />
      <MinistrySection />
      <ServicesSection />
      <WalletSection />
      <DashboardSection />
      <MobileSection />
      <AIAssistantSection />
      <FooterSection />
    </div>
  );
};

export default ShebaPlatform;
