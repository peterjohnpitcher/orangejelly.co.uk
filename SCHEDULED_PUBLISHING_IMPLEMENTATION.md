# Scheduled Blog Posts Implementation Guide

## Overview

This document provides a complete implementation guide for scheduled blog posts in Sanity CMS for the Orange Jelly website. The solution uses Sanity's native scheduled publishing capabilities enhanced with custom queries and utilities.

## 1. Sanity Native Scheduled Publishing

### ✅ Capabilities
- **Native Support**: Sanity has built-in scheduled publishing (Growth plan required)
- **UI Integration**: Schedule documents directly from the Studio interface
- **Automatic Publishing**: Posts publish automatically at scheduled times
- **Time Zone Support**: Configure for UK time zone (GMT/BST)
- **Calendar View**: Visual schedule management
- **No Server Required**: Managed entirely by Sanity infrastructure

### Current Implementation Status
- ✅ Scheduled publishing enabled in `sanity.config.ts`
- ✅ Blog post schema supports 'scheduled' status
- ✅ GROQ queries updated to handle scheduled posts
- ✅ Frontend queries filter scheduled posts correctly
- ✅ Utility functions for schedule management

## 2. Schema Changes

### Blog Post Status Options
```typescript
// sanity-studio/schemas/blogPost.ts
{
  name: 'status',
  title: 'Status',
  type: 'string',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'Published', value: 'published' },
      { title: 'Scheduled', value: 'scheduled' },
    ]
  }
}
```

### Published Date Field
- Existing `publishedDate` field works for scheduled publishing
- Set future date + 'scheduled' status = automatically publishes at that time

## 3. GROQ Query Updates

### Main Blog Posts Query
```groq
*[_type == "blogPost" && (
  status == "published" || 
  (status == "scheduled" && dateTime(publishedDate) <= dateTime(now()))
)] | order(publishedDate desc)
```

### New Scheduled Publishing Queries
- `scheduledPostsQuery`: Future scheduled posts
- `upcomingPostsQuery`: All scheduled content with details
- `recentlyPublishedQuery`: Recently published posts (last 30 days)

## 4. Frontend Implementation

### Automatic Filtering
Posts with `status == "scheduled"` and future `publishedDate` are automatically hidden from:
- Blog listing pages
- Category pages
- Individual post pages (404 for premature access)
- RSS feeds
- Sitemaps

### Content Strategy Support
```typescript
// Utility functions available
import { 
  getScheduledPosts,
  getUpcomingPosts,
  isPostVisible,
  formatPublishDate,
  scheduledPublishingHelpers
} from '@/lib/scheduled-publishing';
```

## 5. Usage Instructions

### Creating Scheduled Posts

1. **In Sanity Studio:**
   - Create new blog post
   - Set status to "Scheduled"
   - Set `publishedDate` to desired future date/time
   - Use Sanity's native scheduled publishing UI
   - Post automatically publishes at specified time

2. **Time Zone Configuration:**
   - Studio configured for UK format: `dd/MM/yyyy HH:mm`
   - Supports GMT/BST automatically

### Content Planning Workflow

1. **Draft Phase:**
   ```
   Status: Draft
   publishedDate: Future date
   ```

2. **Schedule Phase:**
   ```
   Status: Scheduled
   publishedDate: Exact publish time
   ```
   - Use Sanity's schedule UI
   - Visual calendar confirmation
   - Automatic publishing

3. **Published Phase:**
   ```
   Status: Published (automatically updated)
   publishedDate: Actual publish time
   ```

## 6. Best Practices Implementation

### Content Calendar Management
```typescript
// Generate 30-day content calendar
const calendar = await scheduledPublishingHelpers.generateContentCalendar(
  startDate,
  endDate
);
```

### Optimal Publishing Times
```typescript
// Get suggested publish time based on day of week
const optimalTime = scheduledPublishingHelpers.getOptimalPublishTime(targetDate);

// Schedule conflicts checking
const { hasConflict, conflictingPosts } = 
  await scheduledPublishingHelpers.checkSchedulingConflicts(publishDate);
```

### Recommended Schedule
- **Monday-Thursday**: 9:00-11:00 AM (business hours engagement)
- **Friday**: 8:00 AM (early morning)
- **Saturday**: 11:00 AM (late morning leisure reading)
- **Sunday**: 10:00 AM (leisurely morning)

## 7. Multiple Articles Scheduling

### Batch Scheduling Capability
✅ **Yes - Multiple articles can be scheduled for automatic publication**

1. **Prepare Multiple Posts:**
   - Write 5-10 blog posts
   - Save as drafts initially
   - Add all metadata (categories, tags, SEO)

2. **Schedule in Sequence:**
   ```
   Post 1: Monday 9:00 AM
   Post 2: Wednesday 10:00 AM  
   Post 3: Friday 8:00 AM
   Post 4: Next Monday 9:00 AM
   Post 5: Next Wednesday 11:00 AM
   ```

3. **Content Distribution Strategy:**
   - Space posts 2-3 days apart
   - Mix content types (how-to, case studies, tips)
   - Balance seasonal and evergreen content
   - Consider local events and peak times

### Advanced Scheduling Features

1. **Content Series:**
   - Schedule related posts weeks apart
   - Build anticipation with "Part 1 of 3" approach
   - Cross-reference upcoming posts

2. **Seasonal Planning:**
   - Christmas promotions: Schedule in November
   - Summer events: Schedule in April-May
   - New Year content: Schedule in December

3. **SEO Strategy:**
   - Schedule complementary posts to build topic authority
   - Plan internal linking between scheduled posts
   - Coordinate with social media campaigns

## 8. Technical Monitoring

### API Endpoints
- `GET /api/publish-scheduled`: Check posts ready to publish
- Useful for monitoring and logging
- Can integrate with external systems

### Webhook Integration (Optional)
```javascript
// External systems can check publish status
fetch('/api/publish-scheduled', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env.WEBHOOK_SECRET}`
  }
})
```

## 9. Business Benefits

### Editorial Efficiency
- Write multiple posts in focused sessions
- Schedule during non-working hours
- Maintain consistent publishing rhythm
- Reduce daily content management overhead

### SEO Benefits
- Consistent publishing schedule improves search rankings
- Fresh content signals to Google
- Better topic coverage through planned content
- Improved user engagement through regularity

### Marketing Alignment
- Coordinate blog posts with email campaigns
- Align content with social media schedules
- Support seasonal marketing initiatives
- Plan content around business promotions

## 10. Limitations & Considerations

### Sanity Limitations
- **Growth Plan Required**: Scheduled publishing needs paid plan
- **Schedule Storage**: Schedules are not part of dataset exports
- **No GROQ Access**: Cannot query schedules directly via GROQ
- **Project Dependency**: Schedules deleted if project is deleted

### Business Considerations
- Manual intervention needed for time-sensitive content
- Requires planning and batch content creation
- Less flexibility for reactive/news-based content
- Need backup plan if Sanity scheduled publishing fails

## 11. Implementation Steps

### Immediate (Completed)
- ✅ Enable scheduled publishing in Sanity config
- ✅ Update blog post schema with 'scheduled' status
- ✅ Update all GROQ queries for scheduled posts
- ✅ Create utility functions for schedule management
- ✅ Add API endpoint for monitoring

### Next Steps (Optional Enhancements)
1. **Studio Enhancements:**
   - Add custom schedule dashboard in Sanity Studio
   - Create batch scheduling interface
   - Add calendar view component

2. **Frontend Features:**
   - Admin dashboard showing upcoming posts
   - Content calendar visualization
   - Scheduling conflict warnings

3. **Automation:**
   - Email notifications for successful publishes
   - Social media auto-posting integration
   - RSS feed automatic updates

## 12. Success Metrics

### Publishing Consistency
- Target: 3-5 posts per week
- Measure: Actual vs planned publishing dates
- Goal: 95%+ on-time publishing accuracy

### Content Performance
- Monitor engagement on scheduled vs manual posts
- Track SEO improvements from consistent publishing
- Measure time saved in editorial workflow

### Editorial Efficiency
- Time saved on daily content management
- Improved content planning and quality
- Reduced stress on editorial team

## Conclusion

The scheduled publishing implementation provides:
- ✅ Native Sanity scheduled publishing (automatic)
- ✅ Multiple articles scheduling capability
- ✅ Proper query filtering for visitor experience  
- ✅ Editorial workflow improvements
- ✅ SEO and consistency benefits
- ✅ Future enhancement possibilities

This solution enables preparing multiple articles that automatically publish at scheduled dates, significantly improving editorial efficiency while maintaining high content quality and consistency.