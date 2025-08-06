export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Internal name for this content block',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'Unique key for fetching this block',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'CTA', value: 'cta' },
          { title: 'Features', value: 'features' },
          { title: 'Problems', value: 'problems' },
          { title: 'Metrics', value: 'metrics' },
          { title: 'Steps', value: 'steps' },
          { title: 'Generic', value: 'generic' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          description: 'For features, problems, steps, etc.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 3,
                },
                {
                  name: 'icon',
                  title: 'Icon/Emoji',
                  type: 'string',
                },
                {
                  name: 'highlight',
                  title: 'Highlight',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
            },
            {
              name: 'whatsappMessage',
              title: 'WhatsApp Message',
              type: 'string',
              description: 'Pre-filled message for WhatsApp links',
            },
          ],
        },
      ],
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'page',
          title: 'Page',
          type: 'string',
          description: 'Which page this block belongs to',
        },
        {
          name: 'section',
          title: 'Section',
          type: 'string',
          description: 'Which section of the page',
        },
        {
          name: 'order',
          title: 'Order',
          type: 'number',
          description: 'Display order if multiple blocks',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      identifier: 'identifier.current',
    },
    prepare(selection: any) {
      const { title, subtitle, identifier } = selection;
      return {
        title,
        subtitle: `${subtitle} - ${identifier || 'no-id'}`,
      };
    },
  },
};