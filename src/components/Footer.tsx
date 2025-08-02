import Image from 'next/image';
import { CONTACT, COMPANY, URLS, formatPhoneDisplay } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-12 mt-16">
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
        {/* The Anchor section */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-3">
            Proven Daily At
          </p>
          <a 
            href="https://the-anchor.pub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-quick group"
          >
            <Image
              src="/logo_the-anchor.png"
              alt="The Anchor - Stanwell Moor"
              width={200}
              height={80}
              className="mx-auto"
            />
            <p className="text-xs mt-2 opacity-60 group-hover:opacity-100 transition-quick">
              Visit our pub →
            </p>
          </a>
        </div>

        <div className="text-center mb-6 pt-8 border-t border-cream/20">
          <p className="text-lg mb-2">© 2025 Orange Jelly Limited</p>
          <p className="text-sm opacity-75 mb-4">
            Run by publicans, for publicans
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
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
        
        <p className="text-xs text-center mt-6 opacity-50">
          Orange Jelly is a small startup. I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours.
        </p>
      </div>
    </footer>
  );
}