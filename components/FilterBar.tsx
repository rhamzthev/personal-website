"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

interface Topic {
  name: string;
  count: number;
}

interface FilterBarProps {
  topics: Topic[];
}

export default function FilterBar({ topics }: FilterBarProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isDropdownOpen && !(e.target as Element).closest('.filter-dropdown')) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);
  
  // Filter implementation - now using class-based filtering with data attributes
  useEffect(() => {
    const projectCards = document.querySelectorAll('#projects-grid > div');
    
    projectCards.forEach(card => {
      const cardEl = card as HTMLElement;
      const cardTopics = cardEl.dataset.topics?.split(',') || [];
      const cardName = cardEl.dataset.name?.toLowerCase() || '';
      const cardDesc = cardEl.dataset.description?.toLowerCase() || '';
      
      const matchesFilter = activeFilter === 'all' || cardTopics.includes(activeFilter);
      const matchesSearch = searchTerm === '' || 
        cardName.includes(searchTerm.toLowerCase()) || 
        cardDesc.includes(searchTerm.toLowerCase());
      
      if (matchesFilter && matchesSearch) {
        // First remove hidden class to make the element exist in layout
        cardEl.classList.remove('hidden');
        // Then after a tiny delay, fade it in
        setTimeout(() => cardEl.classList.remove('opacity-0'), 30);
      } else {
        // First make it invisible
        cardEl.classList.add('opacity-0');
        // Then after animation completes, hide it completely
        setTimeout(() => cardEl.classList.add('hidden'), 300);
      }
    });
  }, [activeFilter, searchTerm]);

  return (
    <div className="relative">
      <div className="glass-card p-6 mb-8 animate-fade-in-delay-1">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filter dropdown with enhanced styling */}
          <div className="relative flex-grow md:flex-grow-0 md:w-1/3 filter-dropdown z-30">
            <div 
              className="flex items-center justify-between glass-input p-2.5 px-4 cursor-pointer transition-all hover:shadow-glow-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center">
                <span className="text-gray-300">Filter by: </span>
                <span className="ml-2 font-medium text-white">
                  {activeFilter === 'all' ? 'All Projects' : activeFilter}
                </span>
              </div>
              <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Dropdown menu with animation */}
            <div className={`filter-dropdown absolute mt-2 w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} z-30`}>
              <div className="p-1 max-h-60 overflow-y-auto">
                <div 
                  className={`py-2 px-3 rounded cursor-pointer transition-colors hover:bg-white/5 ${activeFilter === 'all' ? 'bg-red-600/20 text-red-400' : ''}`}
                  onClick={() => {
                    setActiveFilter('all');
                    setIsDropdownOpen(false);
                  }}
                >
                  All Projects
                </div>
                
                {topics.map(topic => (
                  <div 
                    key={topic.name}
                    className={`py-2 px-3 rounded cursor-pointer transition-colors hover:bg-white/5 flex justify-between items-center ${activeFilter === topic.name ? 'bg-red-600/20 text-red-400' : ''}`}
                    onClick={() => {
                      setActiveFilter(topic.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {topic.name}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Search input with enhanced styling */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search projects..."
              className="glass-input w-full pl-10 pr-10 transition-all hover:shadow-glow-sm focus:shadow-glow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Active filters display */}
        {(activeFilter !== 'all' || searchTerm) && (
          <div className="flex items-center gap-2 mt-4 text-sm">
            <span className="text-gray-400">Active filters:</span>
            {activeFilter !== 'all' && (
              <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded-full flex items-center">
                {activeFilter}
                <button 
                  onClick={() => setActiveFilter('all')}
                  className="ml-1 hover:text-white"
                  aria-label="Remove filter"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="bg-gray-800/50 text-gray-300 px-2 py-1 rounded-full flex items-center">
                &quot;{searchTerm}&quot;
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:text-white"
                  aria-label="Clear search"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}