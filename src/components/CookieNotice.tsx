'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'oj-cookie-consent';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'accepted');
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50">
      <div className="rounded-lg bg-charcoal text-cream px-4 py-3 shadow-lg flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <p className="text-xs sm:text-sm leading-relaxed">
          We use essential analytics cookies to understand how people find Orange Jelly and to improve the site. By continuing, you agree to this use. Have questions?{' '}
          <Link href="/contact" className="underline underline-offset-2">
            Contact us
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="mt-3 sm:mt-0 inline-flex items-center justify-center rounded-md bg-orange px-3 py-2 text-xs font-semibold text-white hover:bg-orange-dark transition-colors"
          aria-label="Accept analytics cookies"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
