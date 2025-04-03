"use client";
import { GithubRepo } from '@/lib/github';
// import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Format date
  const formattedDate = new Date(repo.pushed_at || repo.updated_at || repo.created_at || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Navigate programmatically to show loading state
    router.push(`/portfolio/${repo.name}`);
  };

  return (
    <div 
      className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-glow group opacity-0 animate-fade-in"
      style={{ 
        animationDelay: `${index * 100}ms`, 
        animationFillMode: 'forwards' 
      }}
      data-topics={repo.topics?.join(',')}
      data-name={repo.name.toLowerCase()}
      data-description={repo.description?.toLowerCase() || ''}
    >
      <div className="flex flex-col h-full">
        {/* Card header with title and date */}
        <div className="mb-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-xl text-white group-hover:text-red-400 transition-colors pr-4">
              {repo.name}
            </h3>
            
            <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">
              {formattedDate}
            </span>
          </div>
        </div>
        
        {/* Card description */}
        <p className="text-gray-400 mb-4">
          {repo.description || ""}
        </p>
        
        {/* Rest of your card content */}
        <div className="mt-auto">
          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.topics?.map((topic) => (
              <span
                key={topic}
                className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
          
          {/* View button with loading state */}
          <div className="mt-auto pt-2">
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={`inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium py-2 px-4 rounded transition-all transform hover:scale-105 ${
                isLoading ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              ) : 'View Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}