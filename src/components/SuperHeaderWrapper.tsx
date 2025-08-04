'use client';

import { useState, useEffect, ReactNode } from 'react';
import SuperHeader from './SuperHeader';
import Navigation from './Navigation';

interface SuperHeaderWrapperProps {
  children: ReactNode;
  announcement?: {
    id: string;
    message: string;
    ctaText?: string;
    ctaLink?: string;
    bgColor?: string;
    textColor?: string;
    dismissible?: boolean;
  };
}

export default function SuperHeaderWrapper({ children, announcement }: SuperHeaderWrapperProps) {
  const [superHeaderVisible, setSuperHeaderVisible] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      
      // SuperHeader hides earlier when scrolling down
      if (scrollingDown && currentScrollY > 50) {
        setSuperHeaderVisible(false);
      } else if (scrollingUp || currentScrollY < 10) {
        setSuperHeaderVisible(true);
      }
      
      // Navigation hides later when scrolling down
      if (scrollingDown && currentScrollY > 150) {
        setNavVisible(false);
      } else if (scrollingUp || currentScrollY < 10) {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* SuperHeader - fixed positioning */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        superHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <SuperHeader announcement={announcement} hideOnScroll={false} />
      </div>
      
      {/* Navigation - fixed positioning that accounts for SuperHeader */}
      <div className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        superHeaderVisible ? 'top-[40px] md:top-[44px]' : 'top-0'
      } ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Navigation />
      </div>
      
      {/* Main content with padding to account for fixed headers */}
      <div className={`transition-all duration-300 ${
        superHeaderVisible ? 'pt-[104px] md:pt-[108px]' : 'pt-16'
      }`}>
        {children}
      </div>
    </>
  );
}