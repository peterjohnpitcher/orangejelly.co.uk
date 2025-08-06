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
      name: 'company',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'registrationNumber',
          title: 'Registration Number',
          type: 'string',
        },
        {
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string',
        },
        {
          name: 'vatRegistered',
          title: 'VAT Registered',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'owner',
          title: 'Owner Name',
          type: 'string',
        },
        {
          name: 'coOwner',
          title: 'Co-Owner Name',
          type: 'string',
        },
      ],
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
        {
          name: 'whatsappNumber',
          title: 'WhatsApp Number (for URL)',
          type: 'string',
          description: 'Format: 447990587315 (country code + number, no spaces)',
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
        {
          name: 'vatRate',
          title: 'VAT Rate (%)',
          type: 'number',
          initialValue: 20,
        },
        {
          name: 'includesVAT',
          title: 'Price Includes VAT',
          type: 'boolean',
          initialValue: false,
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
            {
              name: 'description',
              title: 'Description',
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