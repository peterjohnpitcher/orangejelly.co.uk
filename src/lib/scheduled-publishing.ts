// Utility functions for scheduled blog post publishing
import { client } from '@/lib/sanity.client';
import { scheduledPostsQuery, upcomingPostsQuery, recentlyPublishedQuery } from './sanity.queries';

interface ScheduledPost {
  _id: string;
  title: string;
  slug: string;
  publishedDate: string;
  status: string;
  category?: {
    name: string;
    slug: string;
  };
  author?: {
    name: string;
  };
}

interface UpcomingPost extends ScheduledPost {
  excerpt?: string;
  tags?: string[];
  featuredImage?: any;
}

/**
 * Get all scheduled posts that haven't been published yet
 */
export async function getScheduledPosts(): Promise<ScheduledPost[]> {
  try {
    const posts = await client.fetch(scheduledPostsQuery);
    return posts || [];
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return [];
  }
}

/**
 * Get all upcoming posts (scheduled status) with full details
 */
export async function getUpcomingPosts(): Promise<UpcomingPost[]> {
  try {
    const posts = await client.fetch(upcomingPostsQuery);
    return posts || [];
  } catch (error) {
    console.error('Error fetching upcoming posts:', error);
    return [];
  }
}

/**
 * Get recently published posts (last 30 days)
 */
export async function getRecentlyPublishedPosts(): Promise<ScheduledPost[]> {
  try {
    const posts = await client.fetch(recentlyPublishedQuery);
    return posts || [];
  } catch (error) {
    console.error('Error fetching recently published posts:', error);
    return [];
  }
}

/**
 * Check if a post should be visible based on its status and publish date
 */
export function isPostVisible(post: { status: string; publishedDate: string }): boolean {
  if (post.status === 'published') {
    return true;
  }

  if (post.status === 'scheduled') {
    const publishDate = new Date(post.publishedDate);
    const now = new Date();
    return publishDate <= now;
  }

  return false;
}

/**
 * Format publish date for display with schedule indicator
 */
export function formatPublishDate(date: string, status?: string): string {
  const publishDate = new Date(date);
  const now = new Date();
  const isScheduled = status === 'scheduled' && publishDate > now;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  };

  const formatted = publishDate.toLocaleDateString('en-GB', options);
  return isScheduled ? `Scheduled for ${formatted}` : formatted;
}

/**
 * Get optimal publishing time based on day of week
 */
export function getOptimalPublishTime(targetDate: Date): Date {
  const dayOfWeek = targetDate.getDay();
  const newDate = new Date(targetDate);

  // Set time based on day of week (UK pub industry best practices)
  switch (dayOfWeek) {
    case 0: // Sunday
      newDate.setHours(10, 0, 0, 0); // 10:00 AM
      break;
    case 1: // Monday
    case 2: // Tuesday
    case 3: // Wednesday
    case 4: // Thursday
      newDate.setHours(9, 0, 0, 0); // 9:00 AM
      break;
    case 5: // Friday
      newDate.setHours(8, 0, 0, 0); // 8:00 AM
      break;
    case 6: // Saturday
      newDate.setHours(11, 0, 0, 0); // 11:00 AM
      break;
  }

  return newDate;
}

/**
 * Check for scheduling conflicts (posts scheduled too close together)
 */
export async function checkSchedulingConflicts(
  publishDate: Date,
  windowHours: number = 24
): Promise<{ hasConflict: boolean; conflictingPosts: ScheduledPost[] }> {
  const scheduledPosts = await getScheduledPosts();

  const windowMs = windowHours * 60 * 60 * 1000;
  const publishTime = publishDate.getTime();

  const conflictingPosts = scheduledPosts.filter((post) => {
    const postTime = new Date(post.publishedDate).getTime();
    const timeDiff = Math.abs(postTime - publishTime);
    return timeDiff < windowMs;
  });

  return {
    hasConflict: conflictingPosts.length > 0,
    conflictingPosts,
  };
}

/**
 * Generate content calendar for a date range
 */
export async function generateContentCalendar(
  startDate: Date,
  endDate: Date
): Promise<{ date: string; posts: ScheduledPost[] }[]> {
  const scheduledPosts = await getScheduledPosts();
  const calendar: { [key: string]: ScheduledPost[] } = {};

  // Initialize calendar with empty arrays for each day
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    calendar[dateKey] = [];
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Add scheduled posts to their respective dates
  scheduledPosts.forEach((post) => {
    const postDate = new Date(post.publishedDate);
    if (postDate >= startDate && postDate <= endDate) {
      const dateKey = postDate.toISOString().split('T')[0];
      if (calendar[dateKey]) {
        calendar[dateKey].push(post);
      }
    }
  });

  // Convert to array format
  return Object.entries(calendar).map(([date, posts]) => ({
    date,
    posts,
  }));
}

/**
 * Calculate publishing statistics
 */
export async function getPublishingStats(): Promise<{
  scheduled: number;
  publishedThisMonth: number;
  publishedLastMonth: number;
  averagePostsPerWeek: number;
  nextPublishDate: string | null;
}> {
  const [scheduled, recentlyPublished] = await Promise.all([
    getScheduledPosts(),
    getRecentlyPublishedPosts(),
  ]);

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const publishedThisMonth = recentlyPublished.filter((post) => {
    const postDate = new Date(post.publishedDate);
    return postDate >= thisMonthStart;
  }).length;

  const publishedLastMonth = recentlyPublished.filter((post) => {
    const postDate = new Date(post.publishedDate);
    return postDate >= lastMonthStart && postDate <= lastMonthEnd;
  }).length;

  // Calculate average posts per week (last 30 days)
  const averagePostsPerWeek = Math.round((recentlyPublished.length / 30) * 7 * 10) / 10;

  // Get next publish date
  const nextPost = scheduled.sort(
    (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  )[0];

  return {
    scheduled: scheduled.length,
    publishedThisMonth,
    publishedLastMonth,
    averagePostsPerWeek,
    nextPublishDate: nextPost ? nextPost.publishedDate : null,
  };
}

/**
 * Helper functions for content planning
 */
export const scheduledPublishingHelpers = {
  /**
   * Suggest next publishing slot based on existing schedule
   */
  async suggestNextPublishSlot(preferredDaysApart: number = 3): Promise<Date> {
    const scheduled = await getScheduledPosts();

    if (scheduled.length === 0) {
      // No posts scheduled, suggest tomorrow at optimal time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return getOptimalPublishTime(tomorrow);
    }

    // Find the last scheduled post
    const lastScheduled = scheduled.sort(
      (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )[0];

    const lastDate = new Date(lastScheduled.publishedDate);
    const suggestedDate = new Date(lastDate);
    suggestedDate.setDate(suggestedDate.getDate() + preferredDaysApart);

    return getOptimalPublishTime(suggestedDate);
  },

  /**
   * Validate if a publishing date is appropriate
   */
  validatePublishDate(date: Date): { valid: boolean; reason?: string } {
    const now = new Date();

    if (date <= now) {
      return { valid: false, reason: 'Date must be in the future' };
    }

    const dayOfWeek = date.getDay();
    const hour = date.getHours();

    // Warn about non-optimal times
    if (hour < 8 || hour > 18) {
      return {
        valid: true,
        reason: 'Consider scheduling between 8 AM and 6 PM for better engagement',
      };
    }

    return { valid: true };
  },

  /**
   * Generate publishing schedule for content series
   */
  generateSeriesSchedule(startDate: Date, numberOfPosts: number, daysApart: number = 3): Date[] {
    const schedule: Date[] = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < numberOfPosts; i++) {
      schedule.push(getOptimalPublishTime(new Date(currentDate)));
      currentDate = new Date(currentDate.getTime() + daysApart * 24 * 60 * 60 * 1000);
    }

    return schedule;
  },

  getOptimalPublishTime,
  checkSchedulingConflicts,
  generateContentCalendar,
};
