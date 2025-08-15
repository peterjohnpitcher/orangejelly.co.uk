import { NextRequest, NextResponse } from 'next/server';
import {
  getScheduledPosts,
  getPublishingStats,
  scheduledPublishingHelpers,
} from '@/lib/scheduled-publishing';

// Optional: Add authentication
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function GET(request: NextRequest) {
  // Optional: Check for authentication
  const authHeader = request.headers.get('authorization');
  if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    switch (action) {
      case 'stats':
        // Get publishing statistics
        const stats = await getPublishingStats();
        return NextResponse.json(stats);

      case 'calendar':
        // Generate content calendar
        const startDate = searchParams.get('start');
        const endDate = searchParams.get('end');

        if (!startDate || !endDate) {
          return NextResponse.json({ error: 'Start and end dates required' }, { status: 400 });
        }

        const calendar = await scheduledPublishingHelpers.generateContentCalendar(
          new Date(startDate),
          new Date(endDate)
        );
        return NextResponse.json(calendar);

      case 'suggest':
        // Suggest next publish slot
        const daysApart = searchParams.get('days') ? parseInt(searchParams.get('days')!) : 3;

        const suggestedDate = await scheduledPublishingHelpers.suggestNextPublishSlot(daysApart);
        return NextResponse.json({
          suggestedDate: suggestedDate.toISOString(),
          formatted: suggestedDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/London',
          }),
        });

      case 'check-conflicts':
        // Check scheduling conflicts
        const checkDate = searchParams.get('date');
        const windowHours = searchParams.get('window') ? parseInt(searchParams.get('window')!) : 24;

        if (!checkDate) {
          return NextResponse.json({ error: 'Date required' }, { status: 400 });
        }

        const conflicts = await scheduledPublishingHelpers.checkSchedulingConflicts(
          new Date(checkDate),
          windowHours
        );
        return NextResponse.json(conflicts);

      default:
        // Default: Get all scheduled posts
        const posts = await getScheduledPosts();
        const now = new Date();

        // Separate posts by status
        const readyToPublish = posts.filter((post) => {
          const publishDate = new Date(post.publishedDate);
          return publishDate <= now;
        });

        const upcoming = posts.filter((post) => {
          const publishDate = new Date(post.publishedDate);
          return publishDate > now;
        });

        return NextResponse.json({
          readyToPublish,
          upcoming,
          total: posts.length,
          timestamp: now.toISOString(),
        });
    }
  } catch (error) {
    console.error('Error in publish-scheduled API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to trigger manual publishing check
export async function POST(request: NextRequest) {
  // Optional: Check for authentication
  const authHeader = request.headers.get('authorization');
  if (WEBHOOK_SECRET && authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // This could trigger a manual check for posts ready to publish
    // In production, Sanity's native scheduled publishing handles this automatically

    const posts = await getScheduledPosts();
    const now = new Date();

    const readyToPublish = posts.filter((post) => {
      const publishDate = new Date(post.publishedDate);
      return publishDate <= now && post.status === 'scheduled';
    });

    // Note: Actual publishing is handled by Sanity's scheduled publishing feature
    // This endpoint is for monitoring and reporting only

    return NextResponse.json({
      message: 'Scheduled posts check completed',
      readyToPublish: readyToPublish.length,
      posts: readyToPublish.map((p) => ({
        title: p.title,
        slug: p.slug,
        scheduledFor: p.publishedDate,
      })),
    });
  } catch (error) {
    console.error('Error in publish-scheduled POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
