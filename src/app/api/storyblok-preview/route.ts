import { type NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Storyblok Preview API Route
 *
 * This enables visual editing in Storyblok
 * URL: /api/storyblok-preview?slug=<story_slug>&secret=<preview_secret>
 */
export async function GET(request: NextRequest) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check the secret
  if (secret !== process.env.STORYBLOK_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid preview secret' }, { status: 401 });
  }

  // Check if slug is provided
  if (!slug) {
    return NextResponse.json({ message: 'Slug parameter is required' }, { status: 400 });
  }

  // Enable draft mode
  draftMode().enable();

  // Redirect to the blog post
  redirect(`/licensees-guide/${slug}`);
}
