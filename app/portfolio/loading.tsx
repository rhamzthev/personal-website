import React from 'react';

export default function PortfolioLoading() {
  return (
    <main className="relative min-h-screen pb-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bg-gradient-radial from-gray-900 to-black w-full h-full"></div>
      </div>

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          {/* Header skeleton - match exact spacing and layout of the real header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="h-12 w-64 bg-gray-800/70 rounded-lg mx-auto mb-4"></div>
            <div className="h-6 w-96 max-w-full bg-gray-800/50 rounded-lg mx-auto"></div>
          </div>

          {/* Filter bar skeleton - match the filter component exactly */}
          <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="h-11 bg-gray-800/70 rounded-lg md:w-1/3 w-full"></div>
              <div className="h-11 bg-gray-800/50 rounded-lg flex-grow"></div>
            </div>
          </div>

          {/* Project cards skeleton grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 h-full opacity-0 animate-fade-in"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Card header with title and date */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-7 w-3/4 bg-gray-800/70 rounded-lg"></div>
                      <div className="h-5 w-16 bg-gray-800/50 rounded-lg"></div>
                    </div>
                  </div>
                  
                  {/* Card description */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-800/40 rounded-lg w-full"></div>
                    <div className="h-4 bg-gray-800/40 rounded-lg w-5/6"></div>
                  </div>
                  
                  {/* Topics */}
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-6 w-16 bg-gray-800/30 rounded-full"></div>
                      ))}
                    </div>
                    
                    {/* View button */}
                    <div className="mt-auto pt-2">
                      <div className="h-10 w-28 bg-gradient-to-r from-red-600/70 to-red-700/70 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}