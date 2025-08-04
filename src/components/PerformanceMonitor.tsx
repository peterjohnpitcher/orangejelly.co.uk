'use client';

import { useEffect } from 'react';

// Web Vitals monitoring component
export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamically import web-vitals to reduce bundle size
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      // Log metrics to console or send to analytics
      const logMetric = (metric: any) => {
        // In a real app, you'd send this to your analytics service
        // Example: sendToAnalytics(metric);
        
        // For now, just log it
        if (window.location.hostname === 'localhost') {
          console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
        }
      };

      // Core Web Vitals
      onCLS(logMetric);  // Cumulative Layout Shift
      onFID(logMetric);  // First Input Delay
      onLCP(logMetric);  // Largest Contentful Paint
      
      // Additional metrics
      onFCP(logMetric);  // First Contentful Paint
      onTTFB(logMetric); // Time to First Byte
    });
  }, []);

  return null;
}

// Preload critical resources
export function PreloadResources() {
  return (
    <>
      {/* Google Fonts are automatically optimized by Next.js, no need to preload */}
      
      {/* Preload logo */}
      <link
        rel="preload"
        href="/logo.png"
        as="image"
        type="image/png"
      />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
}

// Lazy load images that are below the fold
export function useLazyLoad() {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-lazy]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));

      return () => {
        images.forEach((img) => imageObserver.unobserve(img));
      };
    }
  }, []);
}