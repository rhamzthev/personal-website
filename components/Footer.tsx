"use client";
// import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-b from-transparent to-gray-950 pointer-events-none"></div>
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-900/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-900/5 rounded-full filter blur-3xl"></div>
      
      <div className="relative container mx-auto py-12 px-4 md:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
          {/* Logo and elevator pitch */}
          <div className="text-center md:text-left space-y-4 md:max-w-sm">
            <div className="font-serif text-3xl font-normal text-white inline-flex items-center">
              Rhamsez Thevenin
            </div>
          </div>
          
          {/* Quick links and social */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <h3 className="text-gray-300 font-medium mb-4 text-sm tracking-wider uppercase">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink href="/">Home</FooterLink>
                </li>
                <li>
                  <FooterLink href="/portfolio">Portfolio</FooterLink>
                </li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-gray-300 font-medium mb-4 text-sm tracking-wider uppercase">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <FooterLink href="https://github.com/rhamzthev" isExternal>GitHub</FooterLink>
                </li>
                <li>
                  <FooterLink href="https://linkedin.com/in/rhamzthev" isExternal>LinkedIn</FooterLink>
                </li>
                <li>
                  <FooterLink href="mailto:rhamzthev@gmail.com">Email</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent my-6"></div>
        
        {/* Copyright and bottom links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <div>
            © {currentYear} Rhamsez Thevenin. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <button 
              className="hover:text-gray-300 transition-colors relative group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span>Back to top</span>
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-red-500 to-red-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer link with hover effect
function FooterLink({ href, children, isExternal = false }: { 
  href: string, 
  children: React.ReactNode, 
  isExternal?: boolean 
}) {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-red-500 to-red-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </span>
      
      {isExternal && (
        <svg className="inline-block w-3 h-3 ml-1 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  );
}