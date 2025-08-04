'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = '',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  style,
  onLoad,
  loading
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate sizes string if not provided
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  // SEO-friendly loading attribute
  const loadingAttr = loading || (priority ? 'eager' : 'lazy');

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback for error state
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={!fill ? { width, height } : undefined}>
      {/* Loading skeleton */}
      {isLoading && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={defaultSizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loadingAttr}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...style,
          opacity: isLoading && !priority ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        // SEO optimizations
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
}

// Helper component for responsive images with art direction
interface ResponsiveImageProps {
  sources: Array<{
    media: string;
    src: string;
    width: number;
    height: number;
  }>;
  fallback: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({ sources, fallback, className, priority }: ResponsiveImageProps) {
  return (
    <picture className={className}>
      {sources.map((source, index) => (
        <source
          key={index}
          media={source.media}
          srcSet={source.src}
          width={source.width}
          height={source.height}
        />
      ))}
      <OptimizedImage
        {...fallback}
        priority={priority}
        className="w-full h-auto"
      />
    </picture>
  );
}

// Helper for background images with optimization
interface OptimizedBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function OptimizedBackground({ 
  src, 
  alt = '', 
  className = '', 
  children, 
  overlay = false,
  overlayOpacity = 0.5 
}: OptimizedBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        quality={90}
        priority
        className="object-cover"
        style={{ zIndex: -1 }}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity, zIndex: 0 }}
          aria-hidden="true"
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}