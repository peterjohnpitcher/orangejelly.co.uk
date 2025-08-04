'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CONTACT, COMPANY, URLS, formatPhoneDisplay, MESSAGES, SUCCESS_METRICS, PRICING } from '@/lib/constants';
import Button from '@/components/Button';
import Card from '@/components/Card';
import TrustBadges from '@/components/TrustBadges';
import Heading from '@/components/Heading';
import Text from '@/components/Text';

export default function SuperFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send to your newsletter service
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter Section */}
      <div className="bg-teal py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Heading level={3} color="white" className="mb-4">Get Free Weekly Pub Marketing Tips</Heading>
            <p className="mb-6 text-cream/90">
              Join 150+ licensees getting practical tips every Tuesday. 
              Real examples from real pubs that actually work.
            </p>
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-charcoal min-h-[48px]"
                  required
                />
                <Button variant="primary" size="medium">
                  Get Free Tips
                </Button>
              </form>
            ) : (
              <div className="text-lg font-semibold text-cream bg-teal-dark/50 px-6 py-3 rounded-lg inline-block">
                ✓ You're in! Check your email for confirmation.
              </div>
            )}
            <p className="text-xs mt-4 text-cream/70">
              No spam. Unsubscribe anytime. Usually sent Tuesday mornings.
            </p>
          </div>
        </div>
      </div>

      {/* Success Metrics Bar */}
      <div className="bg-orange py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">£400+</div>
              <div className="text-sm text-white/90">Extra Weekly Revenue</div>
              <div className="text-xs text-white/70 mt-1">Sunday roast sales at The Anchor</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">25-35</div>
              <div className="text-sm text-white/90">Quiz Night Regulars</div>
              <div className="text-xs text-white/70 mt-1">Up from 20 people initially</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">14 Days</div>
              <div className="text-sm text-white/90">To See Results</div>
              <div className="text-xs text-white/70 mt-1">Or your money back guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Orange Jelly Brand Section */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <Image
                src="/logo.png"
                alt="Orange Jelly"
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
              <h3 className="text-2xl font-bold text-orange mb-2">Orange Jelly</h3>
              <p className="text-cream/80 text-lg">Save At Least 5 Hours a Week</p>
            </div>
          </div>

          {/* Mega Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Common Problems Column */}
            <div>
              <h4 className="font-bold text-lg text-orange mb-4">
                Problems We Solve
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services#empty-pub-recovery" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Empty Tuesday Nights</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      Fill quiet weeknights with proven strategies
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#boost-food-sales" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Low Food Sales</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      Increase covers & spend per head
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#done-for-you-marketing" className="group">
                    <span className="text-sm hover:text-orange transition-colors">No Time for Marketing</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      We handle it all for you
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#website" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Can't Be Found Online</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      Get found on Google & social media
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#training" className="group">
                    <span className="text-sm holicensee-orange transition-colors">Don't Understand AI</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      Simple training for busy licensees
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold text-lg text-orange mb-4">
                Our Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/services#quick-wins" className="group">
                    <span className="text-sm hover:text-orange transition-colors">30-Day Quick Wins</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      £62.50/hour - Results guaranteed
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#menu-makeover" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Menu Makeover</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      £62.50/hour - Increase average spend
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#google-my-business" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Google My Business</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      £399 - Get found locally
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#website" className="group">
                    <span className="text-sm hover:text-orange transition-colors">Website Creation</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      From £1499 - Mobile-first design
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services#training" className="group">
                    <span className="text-sm hover:text-orange transition-colors">AI Training</span>
                    <span className="block text-xs text-cream/60 group-hover:text-cream/80 transition-colors">
                      From £150 - Save 5+ hours/week
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-orange hover:underline">
                    View all services →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-bold text-lg text-orange mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/results" className="text-sm hover:text-orange transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/#roi-calculator" className="text-sm hover:text-orange transition-colors">
                    ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-orange transition-colors">
                    About Peter
                  </Link>
                </li>
                <li>
                  <a href="https://the-anchor.pub" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-orange transition-colors">
                    Visit The Anchor
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-orange transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>

              {/* Quick Contact Info */}
              <div className="mt-6 p-4 bg-cream/10 rounded-lg">
                <h5 className="font-semibold text-sm mb-2">Quick Contact</h5>
                <div className="space-y-2 text-xs">
                  <a href={URLS.whatsapp()} className="block hover:text-orange transition-colors">
                    📱 {formatPhoneDisplay()}
                  </a>
                  <a href={`tel:${CONTACT.phone}`} className="block hover:text-orange transition-colors">
                    📞 Call: {CONTACT.phone}
                  </a>
                  <a href={URLS.email} className="block hover:text-orange transition-colors">
                    ✉️ {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Trust & About Column */}
            <div>
              <h4 className="font-bold text-lg text-orange mb-4">
                Why Choose Us
              </h4>
              
              {/* Trust Badges */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚫</span>
                  <div>
                    <div className="font-semibold text-sm">No Agency Fees</div>
                    <div className="text-xs text-cream/60">Simple, honest pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍺</span>
                  <div>
                    <div className="font-semibold text-sm">From Real licensees</div>
                    <div className="text-xs text-cream/60">We run The Anchor pub</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="font-semibold text-sm">Results in 14 Days</div>
                    <div className="text-xs text-cream/60">Or your money back</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <div className="font-semibold text-sm">Cost Effective</div>
                    <div className="text-xs text-cream/60">Less than part-time staff</div>
                  </div>
                </div>
              </div>

              {/* The Anchor Badge */}
              <div className="p-4 bg-cream/10 rounded-lg">
                <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                  Proven Daily At
                </p>
                <a 
                  href="https://the-anchor.pub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-quick"
                >
                  <Image
                    src="/logo_the-anchor.png"
                    alt="The Anchor - Stanwell Moor"
                    width={150}
                    height={60}
                    className="mx-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-cream/20">
            {/* Company Info */}
            <div className="text-center mb-6">
              <Text size="lg" className="mb-2">© 2025 Orange Jelly Limited</Text>
              <p className="text-sm opacity-75 mb-4">
                Run by licensees, for licensees
              </p>
            </div>
            
            {/* Contact Bar */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm mb-6">
              <a
                href={URLS.whatsapp()}
                className="hover:text-orange transition-quick"
                rel="noopener noreferrer"
                aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
              >
                {formatPhoneDisplay()}
              </a>
              <span className="hidden sm:inline opacity-50">|</span>
              <a
                href={URLS.email}
                className="hover:text-orange transition-quick"
              >
                Email: {CONTACT.email}
              </a>
              <span className="hidden sm:inline opacity-50">|</span>
              <a
                href="https://the-anchor.pub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-quick"
              >
                Visit The Anchor
              </a>
            </div>
            
            {/* Personal Message */}
            <p className="text-xs text-center opacity-50 max-w-2xl mx-auto">
              Orange Jelly is a small startup. I personally reply to every message. 
              During service? I'll get back to you after. Otherwise, expect a reply within a few hours.
            </p>

            {/* Get Started CTA */}
            <div className="text-center mt-8">
              <Button href={URLS.whatsapp(MESSAGES.whatsapp.quickWins)} variant="primary" size="large" external>
                Start Your 30-Day Trial →
              </Button>
              <p className="text-xs mt-2 opacity-60">
                No contracts. Cancel anytime. Money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}