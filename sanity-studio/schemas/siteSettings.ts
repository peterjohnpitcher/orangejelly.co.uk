export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'hourlyRate',
          title: 'Hourly Rate',
          type: 'number',
          description: 'Base hourly rate in pounds',
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'GBP',
        },
      ],
    },
    {
      name: 'metrics',
      title: 'Business Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'businessName',
      subtitle: 'tagline',
    },
  },
};