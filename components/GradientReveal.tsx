// components/GradientReveal.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function GradientReveal({ text }: {
  text: string
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center select-none">
      <div className="relative w-full h-full" ref={containerRef}>
        {/* SVG text with stroke */}
        <svg className="w-full" height="100%">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[20vw] font-bold"
            fill="url(#solid)"
          >
            {text}
          </text>
          <defs>
            <linearGradient id="solid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="50%" stopColor="#222" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
        </svg>

        {/* Gradient overlay masked to the text stroke */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: `radial-gradient(circle 20vw at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`,
            WebkitMaskImage: `radial-gradient(circle 20vw at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`
          }}
        >
          <svg className="w-full" height="100%">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[20vw] font-bold"
              fill="url(#gradient)"
            >
              {text}
            </text>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#777" />
                <stop offset="50%" stopColor="#fff" />
                <stop offset="100%" stopColor="#777" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}