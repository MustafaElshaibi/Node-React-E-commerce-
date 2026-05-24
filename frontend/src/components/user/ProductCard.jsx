import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const ColorSwatch = ({ color, size = 'sm' }) => {
  const colorMap = {
    'Grey': 'bg-gray-400',
    'Navy': 'bg-blue-900',
    'Beige': 'bg-amber-100',
    'Black': 'bg-black',
    'White': 'bg-white border border-gray-300',
    'Gold': 'bg-yellow-400',
    'Charcoal': 'bg-gray-700',
    'Cream': 'bg-amber-50 border border-gray-200',
    'Natural': 'bg-amber-200',
    'Brass': 'bg-yellow-600',
    'Chrome': 'bg-gray-300'
  }
  
  const sizeClasses = {
    'sm': 'w-3 h-3',
    'md': 'w-4 h-4',
    'lg': 'w-6 h-6'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${colorMap[color] || 'bg-gray-300'} rounded-full`} />
  )
}

const StarRating = ({ rating, size = 'sm' }) => {
  const sizeClasses = {
    'sm': 'w-3 h-3',
    'md': 'w-4 h-4',
    'lg': 'w-5 h-5'
  }
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">({rating})</span>
    </div>
  )
}


const ProductCard = ({ product }) => {
  const originalPrice = product.discount > 0 ? product.price / (1 - product.discount / 100) : null
  const savings = originalPrice ? originalPrice - product.price : 0
  const displayImage = product.image || (product.images && product.images[0]) || null

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.popular && (
              <span className="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </span>
            )}
            {product.onSale && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                On Sale
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                -{product.discount}%
              </span>
            )}
            {product.edition && (
              <span className="bg-purple-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                {product.edition}
              </span>
            )}
          </div>

          {/* Hover actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white p-2 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to cart button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="w-full bg-black text-white hover:bg-gray-800 text-sm py-2">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to cart
            </Button>
          </div>

          {/* Savings indicator */}
          {savings > 0 && (
            <div className="absolute bottom-3 right-3 bg-green-600 text-white px-2 py-1 text-xs font-medium rounded">
              Save ${savings.toFixed(0)}
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Brand and Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
            <span className="text-xs text-gray-400">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mb-2">
            <StarRating rating={product.rating} size="sm" />
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-gray-500 mr-2">Colors:</span>
            {product.colors.slice(0, 3).map((color, index) => (
              <ColorSwatch key={index} color={color} size="sm" />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.model && (
              <span className="text-xs text-gray-400">{product.model}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard;
