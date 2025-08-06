import Link from 'next/link';
import { CONTACT, URLS, formatPhoneDisplay } from '@/lib/constants';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import OptimizedImage from '@/components/OptimizedImage';
import { type FooterContent } from '@/lib/sanity-footer';

interface FooterSimpleProps {
  footerContent?: FooterContent | null;
}

export default function FooterSimple({ footerContent }: FooterSimpleProps) {
  const currentYear = new Date().getFullYear();
  
  // Fallback data
  const defaultServices = [
    { title: 'Empty Pub Recovery', href: '/services#empty-pub-recovery' },
    { title: 'Menu Makeover', href: '/services#boost-food-sales' },
    { title: 'Marketing Package', href: '/services#done-for-you-marketing' },
    { title: 'View All →', href: '/services' },
  ];
  
  const defaultQuickLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Success Stories', href: '/results' },
    { title: 'Contact', href: '/contact' },
    { title: 'The Anchor', href: 'https://the-anchor.pub', external: true },
  ];
  
  // Use Sanity data with fallbacks
  const services = footerContent?.services?.slice(0, 4) || defaultServices;
  const quickLinks = footerContent?.quickLinks?.filter(link => 
    ['/about', '/results', '/contact'].includes(link.href) || link.external
  ) || defaultQuickLinks;

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
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={service.href} 
                      className={service.href === '/services' ? "text-orange hover:underline" : "hover:text-orange transition-colors"}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <Heading level={5} color="orange" className="mb-3">Company</Heading>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className="hover:text-orange transition-colors"
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
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
                <Link href={URLS.whatsapp()} className="block hover:text-orange transition-colors" target="_blank" rel="noopener noreferrer">
                  📱 WhatsApp
                </Link>
                <a href={`tel:${footerContent?.contactInfo?.phone || CONTACT.phone}`} className="block hover:text-orange transition-colors">
                  📞 {footerContent?.contactInfo?.phone || CONTACT.phone}
                </a>
                <a href={`mailto:${footerContent?.contactInfo?.email || CONTACT.email}`} className="block hover:text-orange transition-colors">
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
                {footerContent?.bottomBar?.copyrightText?.replace('{year}', currentYear.toString()) || 
                 `© ${currentYear} Orange Jelly Limited`} | 
                {footerContent?.bottomBar?.additionalText?.replace(' | Made with ❤️ in Stanwell Moor', '') || 
                 'Run by licensees, for licensees'}
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