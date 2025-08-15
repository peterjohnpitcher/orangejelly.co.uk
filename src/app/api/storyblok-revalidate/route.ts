import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Storyblok Webhook Revalidation Endpoint
 *
 * This endpoint is called by Storyblok when content is published/unpublished
 * to trigger Next.js ISR revalidation
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Verify webhook secret
    const secret = request.headers.get('webhook-secret');
    if (secret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid webhook secret' }, { status: 401 });
    }

    // Extract story information
    const { story_id, action, slug, full_slug } = body;

    console.log(`Storyblok webhook received: ${action} for ${full_slug || slug}`);

    // Determine what to revalidate based on the story
    if (full_slug?.startsWith('blog/') || slug) {
      // Revalidate the specific blog post
      const blogSlug = slug || full_slug.replace('blog/', '');
      const path = `/licensees-guide/${blogSlug}`;

      revalidatePath(path);
      console.log(`Revalidated: ${path}`);

      // Also revalidate the blog listing page
      revalidatePath('/licensees-guide');
      console.log('Revalidated: /licensees-guide');

      // Revalidate by tag for more granular control
      revalidateTag('blog-posts');
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated blog content for ${slug}`,
    });
  } catch (error) {
    console.error('Storyblok webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed', error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for manual revalidation (useful for testing)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Check secret
  if (secret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate specific path or all blog content
  if (path) {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
    });
  } else {
    // Revalidate all blog content
    revalidatePath('/licensees-guide');
    revalidateTag('blog-posts');

    return NextResponse.json({
      revalidated: true,
      message: 'All blog content revalidated',
    });
  }
}
