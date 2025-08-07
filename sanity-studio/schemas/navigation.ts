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
    {
      name: 'whatsappCta',
      title: 'WhatsApp CTA Button',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show WhatsApp Button',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'text',
          title: 'WhatsApp Message',
          type: 'string',
          description: 'Pre-filled message when user clicks the button',
          initialValue: "Hi Peter, I'd like to chat about Orange Jelly",
        },
        {
          name: 'phoneNumber',
          title: 'WhatsApp Phone Number',
          type: 'string',
          description: 'Phone number in international format (e.g., 447990587315)',
          initialValue: '447990587315',
        },
        {
          name: 'showInDesktop',
          title: 'Show in Desktop Navigation',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showInMobile',
          title: 'Show in Mobile Navigation',
          type: 'boolean',
          initialValue: true,
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