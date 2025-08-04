import Link from 'next/link';
import { CONTACT, URLS, formatPhoneDisplay } from '@/lib/constants';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import OptimizedImage from '@/components/OptimizedImage';

export default function FooterSimple() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Logo and Tagline */}
          <div className="text-center mb-8">
            <OptimizedImage
              src="/logo.png"
              alt="Orange Jelly"
              width={60}
              height={60}
              className="mx-auto mb-3 rounded-lg"
            />
            <Heading level={3} color="orange" align="center" className="mb-2">Orange Jelly</Heading>
            <Text align="center" className="text-cream/80">AI Solutions That Save 5+ Hours Weekly</Text>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <Heading level={5} color="orange" className="mb-3">Services</Heading>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services#empty-pub-recovery" className="hover:text-orange transition-colors">Empty Pub Recovery</Link></li>
                <li><Link href="/services#boost-food-sales" className="hover:text-orange transition-colors">Menu Makeover</Link></li>
                <li><Link href="/services#done-for-you-marketing" className="hover:text-orange transition-colors">Marketing Package</Link></li>
                <li><Link href="/services" className="text-orange hover:underline">View All →</Link></li>
              </ul>
            </div>
            
            <div>
              <Heading level={5} color="orange" className="mb-3">Company</Heading>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-orange transition-colors">About Us</Link></li>
                <li><Link href="/results" className="hover:text-orange transition-colors">Success Stories</Link></li>
                <li><Link href="/contact" className="hover:text-orange transition-colors">Contact</Link></li>
                <li><a href="https://the-anchor.pub" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">The Anchor</a></li>
              </ul>
            </div>
            
            <div>
              <Heading level={5} color="orange" className="mb-3">Resources</Heading>
              <ul className="space-y-2 text-sm">
                <li><Link href="/empty-pub-solutions" className="hover:text-orange transition-colors">Empty Pub Guide</Link></li>
                <li><Link href="/pub-rescue" className="hover:text-orange transition-colors">Pub Rescue</Link></li>
                <li><Link href="/#roi-calculator" className="hover:text-orange transition-colors">ROI Calculator</Link></li>
              </ul>
            </div>
            
            <div>
              <Heading level={5} color="orange" className="mb-3">Get in Touch</Heading>
              <div className="space-y-2 text-sm">
                <a href={URLS.whatsapp()} className="block hover:text-orange transition-colors">
                  📱 WhatsApp
                </a>
                <a href={`tel:${CONTACT.phone}`} className="block hover:text-orange transition-colors">
                  📞 {CONTACT.phone}
                </a>
                <a href={URLS.email} className="block hover:text-orange transition-colors">
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cream/20 pt-8">
            {/* Bottom Info */}
            <div className="text-center">
              <Text size="sm" align="center" className="mb-4">
                © {currentYear} Orange Jelly Limited | Run by licensees, for licensees
              </Text>
              
              {/* CTA Button */}
              <Button 
                href={URLS.whatsapp()} 
                variant="primary" 
                size="medium" 
                external
                className="mb-4"
              >
                Get Marketing Help
              </Button>
              
              <Text size="xs" align="center" className="opacity-60">
                I personally reply to every message. During service? I'll get back to you after.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}