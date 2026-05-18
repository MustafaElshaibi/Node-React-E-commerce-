import React from 'react';

const BannerGrid = () => {
  // Banner data
  const banners = [
    {
      title: 'Living Room',
      description: 'Transform your living space',
      buttonText: 'Shop Now',
      bgColor: 'bg-[#F3F5F7]',
      accentColor: 'bg-amber-500',
      textColor: 'text-amber-900'
    },
    {
      title: 'Bedroom',
      description: 'Create your dream sanctuary',
      buttonText: 'Shop Now',
     bgColor: 'bg-[#F3F5F7]',
      accentColor: 'bg-blue-500',
      textColor: 'text-blue-900'
    },
    {
      title: 'Kitchen',
      description: 'Modern solutions for your home',
      buttonText: 'Shop Now',
     bgColor: 'bg-[#F3F5F7]',
      accentColor: 'bg-green-500',
      textColor: 'text-green-900'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Our Collections
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated selections for every room in your home
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`${banner.bgColor} rounded-2xl shadow-sm overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="p-8 flex flex-col h-full">
              <div className="mb-6">
                <div className={`${banner.accentColor} w-16 h-1 mb-4 rounded-full`}></div>
                <h3 className={`${banner.textColor} text-3xl font-bold mb-2`}>{banner.title}</h3>
                <p className="text-gray-600">{banner.description}</p>
              </div>
              
              <div className="mt-auto">
                <button 
                  className={`${banner.textColor} font-medium py-3 px-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center`}
                >
                  {banner.buttonText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default BannerGrid;