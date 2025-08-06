export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      hidden: true,
    },
    {
      name: 'mainMenu',
      title: 'Main Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Lower numbers appear first',
            },
            {
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
              description: 'Opens in new tab if true',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'mobileMenu',
      title: 'Mobile Menu Items',
      type: 'array',
      description: 'Optional: Different menu for mobile. If empty, uses main menu.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
            },
            {
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};