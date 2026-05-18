import { ArrowRight, Star, ShoppingBag, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import modernFurniture1 from '../../assets/modern-furniture-1.jpg'
import modernFurniture2 from '../../assets/modern-furniture-2.jpg'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white dark:from-background dark:to-background  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-3xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {/* Trust Indicators */}
              <div className="flex items-center gap-4 mb-6 sm:justify-center lg:justify-start">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600  dark:text-foreground ml-1">4.9 (2,341 reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="text-sm text-gray-600 dark:text-foreground">50,000+ Happy Customers</div>
              </div>

              <h1 className="text-4xl tracking-tight dark:text-foreground font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Transform Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r dark:from-foreground dark:to-pink-500 from-gray-900 to-gray-600">
                  Living Space
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 dark:text-accent-foreground sm:text-xl sm:max-w-xl sm:mx-auto md:text-2xl lg:mx-0 leading-relaxed">
                Discover premium furniture, home decor, electronics, fashion, and lifestyle products. 
                Everything you need to create your perfect space.
              </p>

              {/* Product Categories */}
              <div className="mt-8 flex flex-wrap gap-3 sm:justify-center lg:justify-start">
                {['Furniture', 'Electronics', 'Fashion', 'Home Decor', 'Lighting'].map((category) => (
                  <span key={category} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    {category}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Button className="w-full sm:w-auto flex items-center dark:border-1 dark:border-white justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-black hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="w-full dark:text-white sm:w-auto mt-3 sm:mt-0 flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300">
                  View Collections
                </Button>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      {/* Enhanced Image Section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={modernFurniture1}
            alt="Modern furniture showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Floating Product Cards */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-4">
                <img
                  src={modernFurniture2}
                  alt="Featured product"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Modern Sofa Collection</h3>
                  <p className="text-sm text-gray-600">Starting from $299</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>
                </div>
                <Button size="sm" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
