'use client';

import OptimizedImage from '@/components/OptimizedImage';
import NextLink from 'next/link';
import Link from '@/components/Link';
import { useState } from 'react';
import { CONTACT, COMPANY, URLS, formatPhoneDisplay, MESSAGES, SUCCESS_METRICS, PRICING } from '@/lib/constants';
import Button from '@/components/Button';
import Card from '@/components/Card';
import TrustBadges from '@/components/TrustBadges';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Container from '@/components/Container';
import Box from '@/components/Box';
import Input from '@/components/forms/Input';
import { PLACEHOLDERS } from '@/lib/validation-messages';

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
      <Box className="bg-teal py-12">
        <Container maxWidth="6xl" className="px-4 sm:px-6">
          <Container maxWidth="2xl" className="text-center">
            <Heading level={3} color="white" className="mb-4">Get Free Weekly Pub Marketing Tips</Heading>
            <Text className="mb-6 text-cream/90">
              Join 150+ licensees getting practical tips every Tuesday. 
              Real examples from real pubs that actually work.
            </Text>
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={PLACEHOLDERS.email.footer}
                  className="flex-1 text-charcoal min-h-[48px]"
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
            <Text size="xs" className="mt-4 text-cream/70">
              No spam. Unsubscribe anytime. Usually sent Tuesday mornings.
            </Text>
          </Container>
        </Container>
      </Box>

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

        {/* Close Success Metrics Bar wrapper */}
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Orange Jelly Brand Section */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <OptimizedImage
                src="/logo.png"
                alt="Orange Jelly"
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
              <Heading level={3} color="orange" align="center" className="mb-2">Orange Jelly</Heading>
              <Text size="lg" className="text-cream/80">Save At Least 5 Hours a Week</Text>
            </div>
          </div>

          {/* Mega Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Common Problems Column */}
            <div>
              <Heading level={4} color="orange" className="mb-4">
                Problems We Solve
              </Heading>
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
              <Heading level={4} color="orange" className="mb-4">
                Our Services
              </Heading>
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
              <Heading level={4} color="orange" className="mb-4">
                Resources
              </Heading>
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
                  <Link href="https://the-anchor.pub" external className="text-sm hover:text-orange transition-colors">
                    Visit The Anchor
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-orange transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>

              {/* Quick Contact Info */}
              <div className="mt-6 p-4 bg-cream/10 rounded-lg">
                <Heading level={5} className="font-semibold text-sm mb-2">Quick Contact</Heading>
                <div className="space-y-2 text-xs">
                  <Link href={URLS.whatsapp()} className="block hover:text-orange transition-colors">
                    📱 {formatPhoneDisplay()}
                  </Link>
                  <Link href={`tel:${CONTACT.phone}`} className="block hover:text-orange transition-colors">
                    📞 Call: {CONTACT.phone}
                  </Link>
                  <Link href={URLS.email} className="block hover:text-orange transition-colors">
                    ✉️ {CONTACT.email}
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust & About Column */}
            <div>
              <Heading level={4} color="orange" className="mb-4">
                Why Choose Us
              </Heading>
              
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
                <Text size="xs" className="uppercase tracking-wider opacity-60 mb-2">
                  Proven Daily At
                </Text>
                <Link 
                  href="https://the-anchor.pub" 
                  external
                  className="inline-block hover:opacity-80 transition-quick"
                >
                  <OptimizedImage
                    src="/logo_the-anchor.png"
                    alt="The Anchor - Stanwell Moor"
                    width={150}
                    height={60}
                    className="mx-auto"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-cream/20">
            {/* Company Info */}
            <div className="text-center mb-6">
              <Text size="lg" className="mb-2">© 2025 Orange Jelly Limited</Text>
              <Text size="sm" className="opacity-75 mb-4">
                Run by licensees, for licensees
              </Text>
            </div>
            
            {/* Contact Bar */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm mb-6">
              <Link
                href={URLS.whatsapp()}
                className="hover:text-orange transition-quick"
                aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
              >
                {formatPhoneDisplay()}
              </Link>
              <span className="hidden sm:inline opacity-50">|</span>
              <Link
                href={URLS.email}
                className="hover:text-orange transition-quick"
              >
                Email: {CONTACT.email}
              </Link>
              <span className="hidden sm:inline opacity-50">|</span>
              <Link
                href="https://the-anchor.pub"
                external
                className="hover:text-orange transition-quick"
              >
                Visit The Anchor
              </Link>
            </div>
            
            {/* Personal Message */}
            <Text className="text-xs text-center opacity-50 max-w-2xl mx-auto">
              Orange Jelly is a small startup. I personally reply to every message. 
              During service? I'll get back to you after. Otherwise, expect a reply within a few hours.
            </Text>

            {/* Get Started CTA */}
            <div className="text-center mt-8">
              <Button href={URLS.whatsapp(MESSAGES.whatsapp.quickWins)} variant="primary" size="large" external>
                Start Your 30-Day Trial →
              </Button>
              <Text className="text-xs mt-2 opacity-60">
                No contracts. Cancel anytime. Money-back guarantee.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}