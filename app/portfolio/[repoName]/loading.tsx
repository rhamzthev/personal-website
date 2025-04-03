export default function RepoLoading() {
  return (
    <main className="bg-gradient-radial from-gray-900 to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 xl:px-12 py-16 pt-20">
        {/* Back button skeleton */}
        <div className="w-32 h-6 bg-gray-800/70 rounded-lg mb-8"></div>

        {/* Header skeleton - match the repo header layout exactly */}
        <div className="mb-12 border-l-4 border-red-600 pl-6 opacity-0 animate-fade-in" 
             style={{ animationFillMode: 'forwards' }}>
          <div className="h-12 w-3/4 bg-gray-800/70 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-800/50 rounded-lg mb-6"></div>
          
          {/* Topic tags skeleton */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-800/40 rounded-full"></div>
            ))}
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="h-11 w-36 bg-gradient-to-r from-red-600/70 to-red-700/70 rounded-lg"></div>
            <div className="h-11 w-36 bg-gray-800/50 rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-3 opacity-0 animate-fade-in"
               style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden shadow-lg shadow-black/20 p-6">
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="mb-8">
                    <div className="h-8 w-1/3 bg-gray-800/70 rounded-lg mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-800/50 rounded-lg w-full"></div>
                      <div className="h-4 bg-gray-800/50 rounded-lg w-full"></div>
                      <div className="h-4 bg-gray-800/50 rounded-lg w-2/3"></div>
                    </div>
                    
                    {/* Code block skeleton */}
                    <div className="h-32 bg-gray-900/50 border border-gray-800 rounded-lg mb-6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-8 opacity-0 animate-fade-in" 
               style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {/* Languages skeleton */}
            <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/20">
              <div className="h-7 w-32 bg-gray-800/70 rounded-lg mb-5"></div>
              
              <div className="space-y-4 mt-4 border-t border-gray-800 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <div className="h-5 w-20 bg-gray-800/50 rounded-lg"></div>
                      <div className="h-5 w-10 bg-gray-800/30 rounded-lg"></div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full"
                        style={{ width: `${85 - (i * 20)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 shadow-lg shadow-black/20">
              <div className="h-7 w-20 bg-gray-800/70 rounded-lg mb-5"></div>
              
              <div className="space-y-4 mt-4 border-t border-gray-800 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-5 w-24 bg-gray-800/50 rounded-lg"></div>
                    <div className="h-5 w-16 bg-gray-800/30 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}