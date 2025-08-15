import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// This secret should be set in your environment variables and in Sanity webhook settings
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Verify the webhook secret if it's configured
    if (WEBHOOK_SECRET) {
      const signature = request.headers.get('sanity-webhook-signature');
      if (signature !== WEBHOOK_SECRET) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature', revalidated: false },
          { status: 401 }
        );
      }
    }

    console.log('Revalidation webhook received for:', body._type, body.slug?.current);

    // Handle different document types
    if (body._type === 'blogPost') {
      // Revalidate the specific blog post page if slug exists
      if (body.slug?.current) {
        const postPath = `/licensees-guide/${body.slug.current}`;
        revalidatePath(postPath);
        console.log(`Revalidated: ${postPath}`);
      }

      // Always revalidate the blog listing page
      revalidatePath('/licensees-guide');
      console.log('Revalidated: /licensees-guide');

      // Revalidate category pages if category is present
      if (body.category?._ref || body.category?.slug?.current) {
        // Note: You might need to fetch the category slug from the reference
        // For now, we'll revalidate all category pages
        const categories = [
          'empty-pub-solutions',
          'social-media',
          'competition',
          'food-drink',
          'events-promotions',
          'customer-acquisition',
          'digital-reputation',
          'location-challenges',
          'operations',
          'supplier-relations',
          'financial-management',
          'compliance',
          'crisis-management',
        ];

        categories.forEach((category) => {
          const categoryPath = `/licensees-guide/category/${category}`;
          revalidatePath(categoryPath);
          console.log(`Revalidated: ${categoryPath}`);
        });
      }

      return NextResponse.json({
        revalidated: true,
        paths: [`/licensees-guide/${body.slug?.current}`, '/licensees-guide', 'category pages'],
        timestamp: new Date().toISOString(),
      });
    }

    // Handle other content types as needed
    if (body._type === 'author' || body._type === 'category') {
      // Revalidate all blog pages when author or category changes
      revalidatePath('/licensees-guide');
      console.log('Revalidated blog pages due to', body._type, 'change');

      return NextResponse.json({
        revalidated: true,
        type: body._type,
        timestamp: new Date().toISOString(),
      });
    }

    // Default response for unhandled types
    console.log('No revalidation needed for type:', body._type);
    return NextResponse.json({
      revalidated: false,
      message: `No revalidation rules for type: ${body._type}`,
    });
  } catch (error) {
    console.error('Error in revalidation webhook:', error);
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for testing
export async function GET(request: NextRequest) {
  // This endpoint can be used to manually trigger revalidation for testing
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const path = searchParams.get('path');

  // Check secret for manual revalidation
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to revalidate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
