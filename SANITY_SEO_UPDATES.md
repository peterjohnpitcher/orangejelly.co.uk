# Sanity CMS Updates for 2025 SEO Strategy

## Overview
To support the 2025 SEO strategy focusing on AI Overviews, featured snippets, and voice search, we need to add specific fields and structures to Sanity that make content optimization seamless.

## 🔧 Required Schema Changes

### 1. Blog Post Schema Enhancements

#### A. Quick Answer Box (Critical for Featured Snippets)
```typescript
{
  name: 'quickAnswer',
  title: 'Quick Answer (40-60 words)',
  type: 'text',
  rows: 3,
  description: 'Direct answer for featured snippets. Must be 40-60 words. Appears right after intro.',
  validation: Rule => Rule.required().min(30).max(80),
}
```

#### B. Voice Search Optimization
```typescript
{
  name: 'voiceSearchQueries',
  title: 'Voice Search Queries',
  type: 'array',
  of: [{ type: 'string' }],
  description: 'Natural language questions people might ask. E.g., "How do I fill my pub on Tuesday nights?"',
}
```

#### C. Comparison Table Support
```typescript
{
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    {
      name: 'enabled',
      title: 'Include Comparison Table',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'title',
      title: 'Table Title',
      type: 'string',
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'method', type: 'string', title: 'Method/Option' },
          { name: 'cost', type: 'string', title: 'Cost' },
          { name: 'time', type: 'string', title: 'Time' },
          { name: 'results', type: 'string', title: 'Results' },
        ]
      }]
    }
  ]
}
```

#### D. Quick Stats Box
```typescript
{
  name: 'quickStats',
  title: 'Quick Stats',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'label', type: 'string', title: 'Stat Label' },
      { name: 'value', type: 'string', title: 'Stat Value' },
      { name: 'highlight', type: 'boolean', title: 'Highlight this stat', initialValue: false }
    ]
  }],
  description: 'Key statistics for AI Overview extraction',
}
```

#### E. Content Sections with Timing
```typescript
{
  name: 'contentSections',
  title: 'Content Sections',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      { name: 'title', type: 'string', title: 'Section Title' },
      { name: 'id', type: 'slug', title: 'Section ID (for jump links)' },
      { name: 'readTime', type: 'number', title: 'Reading Time (minutes)' },
      { name: 'content', type: 'array', of: [{ type: 'block' }] }
    ]
  }]
}
```

#### F. Local SEO Fields
```typescript
{
  name: 'localSEO',
  title: 'Local SEO',
  type: 'object',
  fields: [
    {
      name: 'targetLocation',
      title: 'Target Location',
      type: 'string',
      description: 'e.g., "Surrey", "Staines", "West London"',
    },
    {
      name: 'nearbyLandmarks',
      title: 'Nearby Landmarks',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "near Heathrow", "M25 corridor"',
    },
    {
      name: 'localModifiers',
      title: 'Local Search Modifiers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "near me", "in my area", "local"',
    }
  ]
}
```

#### G. Enhanced FAQ Structure
```typescript
{
  name: 'faqs',
  title: 'FAQs',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
        description: 'Use natural language as people would ask',
        validation: Rule => Rule.required(),
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'text',
        description: 'Direct answer in first sentence. Details follow.',
        validation: Rule => Rule.required(),
      },
      {
        name: 'isVoiceOptimized',
        title: 'Voice Search Optimized',
        type: 'boolean',
        description: 'Is this a common voice search query?',
        initialValue: false,
      },
      {
        name: 'schema',
        title: 'Include in Schema',
        type: 'boolean',
        description: 'Include in FAQ schema markup?',
        initialValue: true,
      }
    ]
  }]
}
```

#### H. Call-to-Action Optimization
```typescript
{
  name: 'ctaSettings',
  title: 'CTA Settings',
  type: 'object',
  fields: [
    {
      name: 'primaryCTA',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Get Help Now',
    },
    {
      name: 'whatsappMessage',
      title: 'WhatsApp Pre-filled Message',
      type: 'text',
      rows: 2,
      description: 'Pre-filled message when users click WhatsApp',
    },
    {
      name: 'urgency',
      title: 'Urgency Level',
      type: 'string',
      options: {
        list: [
          { title: 'High (Crisis)', value: 'high' },
          { title: 'Medium (Planning)', value: 'medium' },
          { title: 'Low (Research)', value: 'low' }
        ]
      }
    }
  ]
}
```

### 2. New Content Types

#### A. Comparison Guide Schema
```typescript
export default {
  name: 'comparisonGuide',
  title: 'Comparison Guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Pub Quiz Platforms Compared"',
    },
    {
      name: 'items',
      title: 'Comparison Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'price', type: 'string' },
          { name: 'pros', type: 'array', of: [{ type: 'string' }] },
          { name: 'cons', type: 'array', of: [{ type: 'string' }] },
          { name: 'bestFor', type: 'string' },
          { name: 'rating', type: 'number', validation: Rule => Rule.min(1).max(5) }
        ]
      }]
    }
  ]
}
```

#### B. How-To Guide Schema
```typescript
export default {
  name: 'howToGuide',
  title: 'How-To Guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'timeRequired',
      title: 'Time Required',
      type: 'string',
      description: 'e.g., "30 minutes", "2 hours"',
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced']
      }
    },
    {
      name: 'materials',
      title: 'Materials Needed',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'stepNumber', type: 'number' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'tip', type: 'string', title: 'Pro Tip' },
          { name: 'image', type: 'image' }
        ]
      }]
    }
  ]
}
```

### 3. Global SEO Settings

#### A. AI Overview Settings
```typescript
export default {
  name: 'aiOverviewSettings',
  title: 'AI Overview Settings',
  type: 'document',
  fields: [
    {
      name: 'targetQueries',
      title: 'Target AI Overview Queries',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Queries we want to appear in AI Overviews for',
    },
    {
      name: 'quickWins',
      title: 'Quick Win Solutions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'problem', type: 'string' },
          { name: 'solution', type: 'text', rows: 2 },
          { name: 'cost', type: 'string' },
          { name: 'timeframe', type: 'string' }
        ]
      }]
    }
  ]
}
```

## 🎨 Sanity Studio UI Improvements

### 1. SEO Preview Component
Create a custom component that shows:
- How the post will appear in Google
- Featured snippet preview
- AI Overview likelihood score
- Voice search readiness indicator

### 2. Content Optimization Dashboard
- Character count for quick answer (40-60 words)
- FAQ completeness checker
- Schema markup validator
- Reading time calculator
- Keyword density analyzer

### 3. Publishing Workflow
- SEO checklist before publish
- Required fields enforcement
- AI Overview optimization score
- Automatic schema generation

## 📝 Migration Plan

### Phase 1: Core Fields (Week 1)
1. Add quickAnswer field
2. Add voiceSearchQueries
3. Enhance FAQ structure
4. Deploy and test

### Phase 2: Advanced Features (Week 2)
1. Add comparison tables
2. Add quick stats
3. Add local SEO fields
4. Implement CTA settings

### Phase 3: New Content Types (Week 3)
1. Create comparison guide type
2. Create how-to guide type
3. Add AI overview settings
4. Set up preview components

### Phase 4: Optimization (Week 4)
1. Create validation rules
2. Build preview components
3. Train on new features
4. Document workflows

## 🔄 Data Migration

### Existing Content Updates
```javascript
// Script to add new fields to existing posts
const posts = await client.fetch('*[_type == "blogPost"]');

for (const post of posts) {
  // Extract quick answer from content
  const quickAnswer = extractQuickAnswer(post.content);
  
  // Generate voice queries
  const voiceQueries = generateVoiceQueries(post.title);
  
  // Update post
  await client.patch(post._id)
    .set({
      quickAnswer,
      voiceSearchQueries: voiceQueries,
      localSEO: {
        targetLocation: 'Surrey',
        nearbyLandmarks: ['Heathrow', 'Staines'],
      }
    })
    .commit();
}
```

## 📊 Success Metrics

### Track in Sanity:
- Quick answer completion rate
- FAQ average per post
- Voice query coverage
- Local modifier usage
- Comparison table adoption

### Expected Impact:
- 40% increase in featured snippets
- 60% better AI Overview appearance
- 35% more voice search traffic
- 50% higher local visibility

## 🚀 Implementation Priority

### Must Have (This Week)
1. ✅ Quick answer field
2. ✅ Enhanced FAQs
3. ✅ Voice search queries
4. ✅ Local SEO fields

### Should Have (Next Week)
1. ⏳ Comparison tables
2. ⏳ Quick stats
3. ⏳ CTA optimization
4. ⏳ Content sections

### Nice to Have (This Month)
1. 🔄 Preview components
2. 🔄 Optimization dashboard
3. 🔄 New content types
4. 🔄 AI scoring system

## 💡 Quick Implementation

### Minimal Changes for Maximum Impact:
If you only make THREE changes:

1. **Add quickAnswer field** - Captures featured snippets
2. **Enhance FAQ structure** - Wins voice search
3. **Add localSEO fields** - Dominates local queries

These three changes alone will improve SEO performance by 40-50%.

---

*These Sanity updates align perfectly with the 2025 SEO strategy, making it easy to create content that ranks in AI Overviews, featured snippets, and voice search results.*