import OptimizedImage from '@/components/OptimizedImage';
import { CONTACT, COMPANY, URLS, formatPhoneDisplay } from '@/lib/constants';
import RelatedLinks from '@/components/RelatedLinks';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import Link from '@/components/Link';
import Partnerships from '@/components/Partnerships';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 mt-16">
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
            <Heading level={3} color="orange" className="mb-2">Orange Jelly</Heading>
            <Text size="lg" className="text-cream/80">Save At Least 5 Hours a Week</Text>
          </div>
        </div>
        {/* The Anchor section */}
        <div className="text-center mb-8">
          <Text size="xs" className="opacity-60 mb-3">
            Proven Daily At
          </Text>
          <Link 
            href="https://the-anchor.pub" 
            external
            className="inline-block hover:opacity-80 transition-quick group"
          >
            <OptimizedImage
              src="/logo_the-anchor.png"
              alt="The Anchor - Stanwell Moor"
              width={200}
              height={80}
              className="mx-auto"
            />
            <Text size="xs" className="mt-2 opacity-60 group-hover:opacity-100 transition-quick">
              Visit our pub →
            </Text>
          </Link>
        </div>

        {/* Partnerships */}
        <div className="mb-8">
          <Partnerships variant="minimal" className="opacity-80" />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 pt-8 border-t border-cream/20">
          <div>
            <Heading level={4} className="font-semibold text-sm uppercase tracking-wider text-orange mb-3">
              Common Problems
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/services#empty-pub-recovery" className="text-sm hover:text-orange transition-colors">
                  Empty Tuesday Nights
                </Link>
              </li>
              <li>
                <Link href="/services#boost-food-sales" className="text-sm hover:text-orange transition-colors">
                  Low Food Sales
                </Link>
              </li>
              <li>
                <Link href="/services#done-for-you-marketing" className="text-sm hover:text-orange transition-colors">
                  No Time for Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#website" className="text-sm hover:text-orange transition-colors">
                  Can't Be Found Online
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level={4} className="font-semibold text-sm uppercase tracking-wider text-orange mb-3">
              Quick Start
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm hover:text-orange transition-colors">
                  Services & Pricing
                </Link>
              </li>
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
            </ul>
          </div>
          
          <div>
            <Heading level={4} className="font-semibold text-sm uppercase tracking-wider text-orange mb-3">
              About Us
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-orange transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="https://the-anchor.pub" external className="text-sm hover:text-orange transition-colors">
                  Visit The Anchor
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-orange transition-colors">
                  Contact Peter
                </Link>
              </li>
              <li>
                <Link href="/services#training" className="text-sm hover:text-orange transition-colors">
                  AI Training
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Heading level={4} className="font-semibold text-sm uppercase tracking-wider text-orange mb-3">
              Get Help Now
            </Heading>
            <ul className="space-y-2">
              <li>
                <Link href={URLS.whatsapp()} external className="text-sm hover:text-orange transition-colors">
                  WhatsApp: {formatPhoneDisplay()}
                </Link>
              </li>
              <li>
                <Link href={`tel:${CONTACT.phone}`} external className="text-sm hover:text-orange transition-colors">
                  Call: {formatPhoneDisplay()}
                </Link>
              </li>
              <li>
                <Link href={URLS.email} external className="text-sm hover:text-orange transition-colors">
                  Email Us
                </Link>
              </li>
              <li>
                <span className="text-sm text-cream/60">
                  Reply within 4 hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mb-6 pt-8 border-t border-cream/20">
          <Text size="lg" className="mb-2">© 2025 Orange Jelly Limited</Text>
          <Text size="sm" className="opacity-75 mb-4">
            Run by licensees, for licensees
          </Text>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <Link
            href={URLS.whatsapp()}
            external
            className="hover:text-orange transition-quick"
            aria-label={`Contact us on WhatsApp at ${CONTACT.phone}`}
          >
            {formatPhoneDisplay()}
          </Link>
          <span className="hidden sm:inline opacity-50">|</span>
          <Link
            href={URLS.email}
            external
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
        
        <Text size="xs" align="center" className="mt-6 opacity-50">
          Orange Jelly is a small startup. I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours.
        </Text>
      </div>
    </footer>
  );
}