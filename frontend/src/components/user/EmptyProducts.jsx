const EmptyProductState = () => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 flex flex-col items-center">
        {/* Decorative elements */}
        <div className="relative w-full max-w-md">
          <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-purple-100 opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-100 opacity-70 animate-pulse delay-300"></div>
          
          {/* Main icon */}
          <div className="relative mx-auto flex items-center justify-center w-48 h-48 bg-gray-50 rounded-full mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find any products matching your criteria. Try adjusting your search or filter parameters.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Browse All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyProductState;