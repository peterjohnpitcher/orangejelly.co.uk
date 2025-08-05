import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'blogPost';

  // Check the secret and next parameters
  // This secret should be stored in environment variables
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (!slug) {
    return new Response('Missing slug', { status: 400 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  // We pass the slug to the page so it can fetch the right data
  const redirectUrl = type === 'blogPost' 
    ? `/licensees-guide/${slug}?preview=true`
    : `/preview/${type}/${slug}`;

  redirect(redirectUrl);
}

// Exit preview mode
export async function POST() {
  draftMode().disable();
  return new Response('Preview mode disabled');
}