import * as React from "react";
import { Image as ShadcnImage, AspectRatioImage } from "@/components/ui/image";
import type { ImageProps as ShadcnImageProps } from "@/components/ui/image";

// Legacy OptimizedImage props
interface LegacyImageProps {
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

export default function ImageAdapter({
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
  loading,
}: LegacyImageProps) {
  // Map legacy props to shadcn props
  const imageProps: ShadcnImageProps = {
    src,
    alt,
    priority,
    sizes,
    className,
    quality,
    placeholder,
    blurDataURL,
    style,
    onLoad,
    loading,
  };

  // Add dimensions if not using fill
  if (!fill) {
    imageProps.width = width;
    imageProps.height = height;
  } else {
    imageProps.fill = true;
  }

  // For fill images, wrap in a container
  if (fill) {
    return (
      <div className={className} style={style}>
        <ShadcnImage {...imageProps} className="" />
      </div>
    );
  }

  return <ShadcnImage {...imageProps} />;
}

// ResponsiveImage adapter
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
  // For now, just use the fallback image
  // TODO: Implement proper picture element support
  return (
    <ShadcnImage
      {...fallback}
      priority={priority}
      className={className}
    />
  );
}

// OptimizedBackground adapter
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
      <ShadcnImage
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