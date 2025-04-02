'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Track scroll position to adjust header appearance
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when navigating
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 backdrop-blur-lg bg-gray-900/70' : 'py-5 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 xl:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative group">
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <div className="relative font-serif text-2xl md:text-4xl font-normal text-white">
                            R
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink href="/" active={pathname === '/'}>Home</NavLink>
                        <NavLink href="/portfolio" active={pathname === '/portfolio' || pathname.startsWith('/portfolio/')}>Portfolio</NavLink>
                        <Link
                            href="/resume.pdf"
                            className="btn-secondary"
                            download
                        >
                            RESUME
                            <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center neomorphic-icon text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span 
                                className={`block bg-white w-5 h-0.5 rounded-full transition-all duration-300 ease-out ${
                                    mobileMenuOpen 
                                        ? 'transform rotate-45 translate-y-1.5' 
                                        : ''
                                }`}
                                style={{ transformOrigin: 'center' }}
                            />
                            <span 
                                className={`block bg-white w-5 h-0.5 rounded-full my-1 transition-all duration-200 ${
                                    mobileMenuOpen 
                                        ? 'opacity-0 transform scale-x-0' 
                                        : 'opacity-100'
                                }`}
                            />
                            <span 
                                className={`block bg-white w-5 h-0.5 rounded-full transition-all duration-300 ease-out ${
                                    mobileMenuOpen 
                                        ? 'transform -rotate-45 -translate-y-1.5' 
                                        : ''
                                }`}
                                style={{ transformOrigin: 'center' }}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute left-0 right-0 top-full bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-lg border-t border-gray-800/50 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100 border-opacity-50' : 'max-h-0 opacity-0 border-opacity-0'
                        }`}
                >
                    <nav className="flex flex-col p-5 space-y-4">
                        <MobileNavLink href="/" active={pathname === '/'}>HOME</MobileNavLink>
                        <MobileNavLink href="/portfolio" active={pathname === '/portfolio' || pathname.startsWith('/portfolio/')}>PORTFOLIO</MobileNavLink>
                        <Link
                            href="/resume.pdf"
                            className="flex items-center justify-center btn-secondary"
                            download
                        >
                            RESUME
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

// Desktop navigation link with hover effects
function NavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`relative text-sm uppercase tracking-wider font-medium transition-colors px-1.5 py-1.5 ${active ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
        >
            {children}
            <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-700 transform origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
            ></span>
        </Link>
    );
}

// Mobile navigation link with active state
function MobileNavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={`block w-full py-2.5 px-4 rounded-lg font-medium transition-all ${active
                    ? 'bg-gray-800/50 text-white'
                    : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                }`}
        >
            {children}
        </Link>
    );
}