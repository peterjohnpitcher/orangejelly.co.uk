'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';

interface AnnouncementBar {
  id: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
  dismissible?: boolean;
}

interface ProblemCategory {
  emoji: string;
  title: string;
  href: string;
  description?: string;
}

interface QuickLink {
  label: string;
  href: string;
}

interface SuperHeaderProps {
  announcement?: AnnouncementBar;
  problemCategories?: ProblemCategory[];
  quickLinks?: QuickLink[];
  hideOnScroll?: boolean;
}

const defaultProblemCategories: ProblemCategory[] = [
  {
    emoji: '🪑',
    title: 'Empty Tables',
    href: '/empty-pub-solutions',
    description: 'Fill your pub every night'
  },
  {
    emoji: '📅',
    title: 'Quiet Midweek',
    href: '/quiet-midweek-solutions',
    description: 'Turn slow days profitable'
  },
  {
    emoji: '🏪',
    title: 'Beat Chains',
    href: '/compete-with-pub-chains',
    description: 'Win against big competitors'
  },
  {
    emoji: '💸',
    title: 'No Budget',
    href: '/pub-marketing-no-budget',
    description: 'Market without spending'
  },
  {
    emoji: '🆘',
    title: 'Pub Rescue',
    href: '/pub-rescue',
    description: 'Emergency turnaround help'
  }
];

const defaultQuickLinks: QuickLink[] = [
  { label: 'Free Consultation', href: '/contact' },
  { label: 'ROI Calculator', href: '/services#calculator' },
  { label: 'Success Stories', href: '/results' },
  { label: 'About Peter', href: '/about' }
];

export default function SuperHeader({
  announcement,
  problemCategories = defaultProblemCategories,
  quickLinks = defaultQuickLinks,
  hideOnScroll = true
}: SuperHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  // Check if announcement was previously dismissed
  useEffect(() => {
    if (announcement?.id) {
      const dismissed = localStorage.getItem(`announcement-dismissed-${announcement.id}`);
      if (dismissed === 'true') {
        setAnnouncementDismissed(true);
      }
    }
  }, [announcement?.id]);

  const handleDismissAnnouncement = () => {
    if (announcement?.id) {
      localStorage.setItem(`announcement-dismissed-${announcement.id}`, 'true');
      setAnnouncementDismissed(true);
    }
  };

  const showAnnouncement = announcement && !announcementDismissed;

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div 
          className={`relative ${announcement.bgColor || 'bg-orange'} ${announcement.textColor || 'text-white'}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center sm:justify-start">
              <p className="text-sm font-medium text-center sm:text-left">
                {announcement.message}
                {announcement.ctaText && announcement.ctaLink && (
                  <Link 
                    href={announcement.ctaLink}
                    className="ml-2 underline hover:no-underline font-semibold"
                  >
                    {announcement.ctaText}
                  </Link>
                )}
              </p>
            </div>
            {announcement.dismissible && (
              <button
                onClick={handleDismissAnnouncement}
                className="ml-4 p-1 hover:opacity-70 transition-opacity"
                aria-label="Dismiss announcement"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main SuperHeader */}
      <div className="bg-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="py-3 flex items-center justify-between">
              {/* Problem Categories */}
              <div className="flex items-center space-x-6">
                <span className="text-xs text-white/60 mr-2">Common Problems:</span>
                {problemCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group flex items-center space-x-1 text-sm hover:text-orange transition-quick"
                  >
                    <span className="text-base group-hover:scale-110 transition-normal">{category.emoji}</span>
                    <span>{category.title}</span>
                  </Link>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex items-center space-x-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/80 hover:text-orange transition-quick"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="py-2 flex items-center justify-between">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center space-x-2 text-sm"
              >
                <span>Quick Links</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <Link 
                href="/contact" 
                className="text-sm font-semibold text-orange hover:text-orange-light transition-quick"
              >
                Free Consultation
              </Link>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="pb-4 border-t border-white/10 mt-2 pt-4">
                {/* Problem Categories */}
                <div className="mb-4">
                  <p className="text-xs text-white/60 mb-3">Common Problems We Solve:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {problemCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="flex items-start space-x-2 p-2 rounded hover:bg-white/5 transition-quick"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">{category.emoji}</span>
                        <div>
                          <p className="text-sm font-medium">{category.title}</p>
                          {category.description && (
                            <p className="text-xs text-white/60">{category.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/60 mb-3">Quick Links:</p>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-sm text-white/80 hover:text-orange py-1 transition-quick"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}