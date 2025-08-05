// Enhanced Blog Post Schema for 2025 SEO
// Optimized for AI Overviews, Featured Snippets, and Voice Search

export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO Optimization' },
    { name: 'ai', title: 'AI & Voice Search' },
    { name: 'local', title: 'Local SEO' },
    { name: 'meta', title: 'Metadata' },
  ],
  fields: [
    // CONTENT GROUP
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Use question format for voice search. E.g., "Why Is My Pub Empty on Tuesday Nights?"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief description for listings and meta description',
      validation: (Rule: any) => Rule.required().max(160),
    },
    
    // AI & VOICE SEARCH GROUP
    {
      name: 'quickAnswer',
      title: '🎯 Quick Answer (Featured Snippet)',
      type: 'text',
      group: 'ai',
      rows: 3,
      description: 'CRITICAL: 40-60 words answering the title question. This appears right after intro and targets featured snippets.',
      validation: (Rule: any) => 
        Rule.required()
          .min(30)
          .max(80)
          .warning('Should be 40-60 words for optimal featured snippet capture'),
    },
    {
      name: 'voiceSearchQueries',
      title: '🎙️ Voice Search Queries',
      type: 'array',
      group: 'ai',
      of: [{ type: 'string' }],
      description: 'Natural language questions. E.g., "How do I get more people in my pub on Tuesday?"',
    },
    {
      name: 'quickStats',
      title: '📊 Quick Stats Box',
      type: 'array',
      group: 'ai',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'label', 
            type: 'string', 
            title: 'Stat Label',
            description: 'E.g., "Quiz Attendance"'
          },
          { 
            name: 'value', 
            type: 'string', 
            title: 'Stat Value',
            description: 'E.g., "25-35 regulars"'
          },
          { 
            name: 'highlight', 
            type: 'boolean', 
            title: 'Highlight this stat', 
            initialValue: false 
          }
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'value',
          },
        },
      }],
      description: 'Key statistics for AI Overview extraction',
    },
    
    // MAIN CONTENT
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
        // Comparison Table Block
        {
          type: 'object',
          name: 'comparisonTable',
          title: 'Comparison Table',
          fields: [
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
                  { name: 'option', type: 'string', title: 'Option/Method' },
                  { name: 'cost', type: 'string', title: 'Cost' },
                  { name: 'time', type: 'string', title: 'Time' },
                  { name: 'results', type: 'string', title: 'Results' },
                ],
              }],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
        // Code Block
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Markdown', value: 'markdown' },
                ],
              },
            },
            {
              name: 'code',
              title: 'Code',
              type: 'text',
            },
          ],
        },
      ],
    },
    
    // ENHANCED FAQs
    {
      name: 'faqs',
      title: '❓ FAQs (Critical for Voice Search)',
      type: 'array',
      group: 'ai',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            description: 'Use natural language as people would ask',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 3,
            description: 'Direct answer in first sentence. Details follow.',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'isVoiceOptimized',
            title: 'Voice Search Optimized',
            type: 'boolean',
            description: 'Common voice search query?',
            initialValue: false,
          },
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'answer',
            media: 'isVoiceOptimized',
          },
          prepare(selection: any) {
            const { title, subtitle, media } = selection;
            return {
              title,
              subtitle: subtitle?.substring(0, 50) + '...',
              media: media ? '🎙️' : '❓',
            };
          },
        },
      }],
      validation: (Rule: any) => Rule.min(3).warning('Add at least 3 FAQs for better SEO'),
    },
    
    // LOCAL SEO GROUP
    {
      name: 'localSEO',
      title: '📍 Local SEO',
      type: 'object',
      group: 'local',
      fields: [
        {
          name: 'targetLocation',
          title: 'Target Location',
          type: 'string',
          description: 'E.g., "Surrey", "Staines", "West London"',
        },
        {
          name: 'nearbyLandmarks',
          title: 'Nearby Landmarks',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'E.g., "near Heathrow", "M25 corridor"',
        },
        {
          name: 'localModifiers',
          title: 'Local Search Modifiers',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'E.g., "near me", "in my area", "local"',
        },
      ],
    },
    
    // SEO GROUP
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'seo',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Leave blank to use post title',
          validation: (Rule: any) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Leave blank to use excerpt',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Focus keywords for this post',
        },
      ],
    },
    
    // METADATA GROUP
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedDate',
      title: 'Updated Date',
      type: 'datetime',
      group: 'meta',
    },
    
    // CTA SETTINGS
    {
      name: 'ctaSettings',
      title: '📞 Call-to-Action Settings',
      type: 'object',
      group: 'content',
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
          initialValue: 'Hi Peter, I read your article about [topic] and need help with my pub.',
        },
        {
          name: 'urgency',
          title: 'Urgency Level',
          type: 'string',
          options: {
            list: [
              { title: 'High (Crisis)', value: 'high' },
              { title: 'Medium (Planning)', value: 'medium' },
              { title: 'Low (Research)', value: 'low' },
            ],
          },
          initialValue: 'medium',
        },
      ],
    },
  ],
  
  // PREVIEW CONFIGURATION
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      status: 'status',
      publishedDate: 'publishedDate',
      media: 'featuredImage',
      quickAnswer: 'quickAnswer',
    },
    prepare(selection: any) {
      const { title, author, status, publishedDate, quickAnswer } = selection;
      const date = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date';
      const hasQuickAnswer = quickAnswer ? '✅' : '❌';
      return {
        title,
        subtitle: `${status === 'published' ? '🟢' : '🟡'} ${author || 'No author'} | ${date} | Quick Answer: ${hasQuickAnswer}`,
        media: selection.media,
      };
    },
  },
  
  // INITIAL VALUE TEMPLATE
  initialValue: {
    status: 'draft',
    quickStats: [
      { label: 'Investment', value: '£X', highlight: false },
      { label: 'Time to Results', value: 'X weeks', highlight: true },
      { label: 'ROI', value: 'X%', highlight: false },
    ],
    localSEO: {
      targetLocation: 'Surrey',
      nearbyLandmarks: ['Heathrow', 'Staines', 'M25'],
      localModifiers: ['near me', 'local', 'in my area'],
    },
    ctaSettings: {
      primaryCTA: 'Get Help Now',
      whatsappMessage: 'Hi Peter, I need help with my pub.',
      urgency: 'medium',
    },
  },
};