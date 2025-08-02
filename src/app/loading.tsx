import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Animated logo */}
          <Image
            src="/logo.png"
            alt="Orange Jelly"
            width={100}
            height={100}
            className="rounded-lg animate-pulse"
            priority
          />
          
          {/* Orange glow effect */}
          <div className="absolute inset-0 bg-orange/30 rounded-lg blur-2xl animate-pulse"></div>
        </div>
        
        <p className="mt-6 text-charcoal font-semibold animate-fade-in">
          Loading Orange Jelly...
        </p>
        
        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}