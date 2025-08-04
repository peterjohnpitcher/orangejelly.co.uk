'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import WhatsAppButton from './WhatsAppButton';
import { LandmarkNav } from '@/components/AriaLandmarks';
import { ariaLabels } from '@/lib/accessibility';
import OptimizedImage from './OptimizedImage';
import Button from './Button';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/licensees-guide', label: "Licensee's Guide" },
    { href: '/results', label: 'Success Stories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <LandmarkNav 
      className="fixed top-0 left-0 right-0 z-50 bg-cream-light/95 backdrop-blur-sm border-b border-orange/20"
      ariaLabel={ariaLabels.navigation.main}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <OptimizedImage
                src="/logo.png"
                alt="Orange Jelly"
                width={48}
                height={48}
                className="rounded-lg transition-normal group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-orange/20 rounded-lg blur-xl group-hover:bg-orange/30 transition-normal -z-10"></div>
            </div>
            <div className="ml-3">
              <span className="font-bold text-lg text-charcoal group-hover:text-orange transition-quick">Orange Jelly</span>
              <span className="hidden sm:block text-xs text-charcoal/60">AI-Powered Pub Marketing</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-orange transition-quick flex items-center h-16"
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="small"
            className="md:hidden p-2 rounded-lg hover:bg-orange/10 transition-quick"
            aria-label={isMenuOpen ? ariaLabels.buttons.close : ariaLabels.buttons.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className={`w-6 h-0.5 bg-charcoal mb-1.5 transition-quick ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-charcoal mb-1.5 transition-quick ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-charcoal transition-quick ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </Button>
          
          <div className="hidden md:block">
            <WhatsAppButton text="Hi Peter, I'd like to chat about Orange Jelly" size="small" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-orange/20 py-4 bg-cream-light/95 backdrop-blur-sm"
            role="navigation"
            aria-label={ariaLabels.navigation.mobile}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-4 text-charcoal hover:text-orange hover:bg-orange/5 rounded-lg transition-quick"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <WhatsAppButton text="Hi Peter, I'd like to chat about Orange Jelly" fullWidth />
            </div>
          </div>
        )}
      </div>
    </LandmarkNav>
  );
}