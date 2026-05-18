import React, { useState } from 'react';
import { Filter, Grid, List, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import chair1 from '../../assets/chair-1.jpg';
import chair2 from '../../assets/chair-2.jpg';
import sofa1 from '../../assets/sofa-1.jpg';
import sofa2 from '../../assets/sofa-2.jpg';
import modernFurniture1 from '../../assets/modern-furniture-1.jpg';
import modernFurniture2 from '../../assets/modern-furniture-2.jpg';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const products = [
    {
      id: 1,
      name: 'Loveseat Sofa',
      price: 199.00,
      originalPrice: 400.00,
      image: sofa1,
      category: 'sofas',
      isNew: false,
      discount: '-50%'
    },
    {
      id: 2,
      name: 'Modern Chair',
      price: 89.00,
      originalPrice: null,
      image: chair1,
      category: 'chairs',
      isNew: true,
      discount: null
    },
    {
      id: 3,
      name: 'Accent Chair',
      price: 124.99,
      originalPrice: null,
      image: chair2,
      category: 'chairs',
      isNew: false,
      discount: null
    },
    {
      id: 4,
      name: 'Elegant Sofa',
      price: 299.00,
      originalPrice: null,
      image: sofa2,
      category: 'sofas',
      isNew: false,
      discount: null
    },
    {
      id: 5,
      name: 'Table Lamp',
      price: 24.99,
      originalPrice: null,
      image: modernFurniture1,
      category: 'lighting',
      isNew: true,
      discount: null
    },
    {
      id: 6,
      name: 'Modern Furniture Set',
      price: 449.00,
      originalPrice: 599.00,
      image: modernFurniture2,
      category: 'sets',
      isNew: false,
      discount: '-25%'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'chairs', name: 'Chairs', count: products.filter(p => p.category === 'chairs').length },
    { id: 'sofas', name: 'Sofas', count: products.filter(p => p.category === 'sofas').length },
    { id: 'lighting', name: 'Lighting', count: products.filter(p => p.category === 'lighting').length },
    { id: 'sets', name: 'Furniture Sets', count: products.filter(p => p.category === 'sets').length },
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-black px-2 py-1 text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.discount && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
              {product.discount}
            </span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="sm" className="bg-white hover:bg-gray-100 p-2">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to cart button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">★★★★★</span>
          </div>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 1000]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-3xl font-bold mb-4 sm:mb-0">Shop</h1>
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8 py-3">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopPage;

