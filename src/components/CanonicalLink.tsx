import Head from 'next/head';

interface CanonicalLinkProps {
  path: string;
  baseUrl?: string;
}

export default function CanonicalLink({ 
  path, 
  baseUrl = 'https://www.orangejelly.co.uk' 
}: CanonicalLinkProps) {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash except for root
  const cleanPath = normalizedPath === '/' 
    ? normalizedPath 
    : normalizedPath.replace(/\/$/, '');
  
  const canonicalUrl = `${baseUrl}${cleanPath}`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

// Helper function to generate canonical URL
export function generateCanonicalUrl(path: string, baseUrl: string = 'https://www.orangejelly.co.uk'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = normalizedPath === '/' 
    ? normalizedPath 
    : normalizedPath.replace(/\/$/, '');
  
  return `${baseUrl}${cleanPath}`;
}