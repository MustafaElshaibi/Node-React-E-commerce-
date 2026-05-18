import {  Star, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { products, getPopularProducts, getOnSaleProducts, getCategories } from '../../components/user/Products'
import ProductCard from './ProductCard'




const ProductGrid = () => {
  const popularProducts = getPopularProducts()
  const onSaleProducts = getOnSaleProducts()
  const categories = getCategories()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium furniture and home decor
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button variant="outline" className="bg-black text-white">All Products</Button>
          {categories.map(category => (
            <Button key={category} variant="outline">{category}</Button>
          ))}
        </div>

        {/* Popular Products Section */}
        {popularProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-orange-500 fill-current" />
              <h3 className="text-xl font-semibold text-gray-900">Popular Items</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* On Sale Products Section */}
        {onSaleProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-900">On Sale</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {onSaleProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">All Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" className="px-8 py-3">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid

