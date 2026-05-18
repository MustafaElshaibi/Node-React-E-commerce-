import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Loveseat Sofa',
      price: 199.00,
      quantity: 1,
      image: '',
    },
    {
      id: 2,
      name: 'Modern Chair',
      price: 89.00,
      quantity: 2,
      image: '',
    },
    {
      id: 3,
      name: 'Table Lamp',
      price: 24.99,
      quantity: 1,
      image: '',
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <Button className="bg-black text-white hover:bg-gray-800">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 py-3">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Promo Code</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;

