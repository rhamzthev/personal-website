"use client";

import { useState, useEffect } from 'react';

export function useAnimatedVisibility(initialVisibility = false, delay = 0) {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isVisible;
}