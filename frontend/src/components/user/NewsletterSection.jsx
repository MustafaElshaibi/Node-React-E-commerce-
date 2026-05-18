import { Mail, Gift, Percent, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const NewsletterSection = () => {
  const benefits = [
    {
      icon: Percent,
      title: 'Exclusive Discounts',
      description: 'Get up to 30% off on selected items'
    },
    {
      icon: Gift,
      title: 'Early Access',
      description: 'Be the first to shop new collections'
    },
    {
      icon: Bell,
      title: 'Product Updates',
      description: 'Stay informed about restocks and launches'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and special offers across all our product categories.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Newsletter Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Join 50,000+ Subscribers</h3>
                <p className="text-gray-300 mb-6">
                  Get insider access to the best deals and latest trends in furniture, electronics, fashion, and more.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">30%</div>
                    <div className="text-sm text-gray-400">Avg. Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">24h</div>
                    <div className="text-sm text-gray-400">Early Access</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">Weekly</div>
                    <div className="text-sm text-gray-400">New Deals</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-bounce">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center animate-pulse">
              <Percent className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
