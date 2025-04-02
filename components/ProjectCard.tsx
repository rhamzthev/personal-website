"use client";
import { GithubRepo } from '@/lib/github';
import Link from 'next/link';
// import { useState } from 'react';

interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export default function ProjectCard({ repo, index }: ProjectCardProps) {
  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Format date
  const formattedDate = new Date(repo.pushed_at || repo.updated_at || repo.created_at || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  // Language icon renderer
  // const getLanguageIcon = (language: string) => {
  //   // Keep your existing language icon logic here
  // };

  return (
    <div 
      className="glass-card p-6 transition-all duration-300 hover:shadow-glow group animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
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
          
          {/* View button */}
          <div className="mt-auto pt-2">
            <Link
              href={`/portfolio/${repo.name}`}
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium py-2 px-4 rounded transition-all transform hover:scale-105"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}