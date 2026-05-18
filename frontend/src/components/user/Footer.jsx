import { Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">SooqMart</h3>
            <p className="text-gray-400 mb-6">
              Gift & Decoration Store
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Page Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Page</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Product</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Return & Refund</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='overflow-hidden'>
            <h4 className="text-lg font-semibold mb-4">Join Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe our newsletter to get more deals, new products and promotions
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-black hover:bg-gray-200 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2023 3legant. All rights reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

