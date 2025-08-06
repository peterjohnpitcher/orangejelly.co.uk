import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'companyConstants',
  title: 'Company Constants',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      readOnly: true,
      initialValue: 'Company Constants'
    }),
    defineField({
      name: 'company',
      title: 'Company Details',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Company Name',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string'
        }),
        defineField({
          name: 'registrationNumber',
          title: 'Registration Number',
          type: 'string'
        }),
        defineField({
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string'
        }),
        defineField({
          name: 'vatRegistered',
          title: 'VAT Registered',
          type: 'boolean'
        }),
        defineField({
          name: 'owner',
          title: 'Owner',
          type: 'string'
        }),
        defineField({
          name: 'coOwner',
          title: 'Co-Owner',
          type: 'string'
        }),
        defineField({
          name: 'founded',
          title: 'Founded Date',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.required().email()
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'whatsapp',
          title: 'WhatsApp Display',
          type: 'string',
          description: 'How to display WhatsApp number'
        }),
        defineField({
          name: 'whatsappNumber',
          title: 'WhatsApp Number',
          type: 'string',
          description: 'WhatsApp number for links'
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text'
        })
      ]
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'perHour',
          title: 'Hourly Rate',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'vatRate',
          title: 'VAT Rate',
          type: 'number',
          description: 'VAT rate as a decimal (e.g., 0.20 for 20%)'
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'GBP'
        }),
        defineField({
          name: 'guarantee',
          title: 'Guarantee',
          type: 'string',
          description: 'e.g., "30-day money-back guarantee"'
        })
      ]
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'context',
            title: 'Context',
            type: 'string',
            description: 'Additional context for the metric'
          })
        ]
      }]
    }),
    defineField({
      name: 'messages',
      title: 'Common Messages',
      type: 'object',
      fields: [
        defineField({
          name: 'trust',
          title: 'Trust Messages',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'whatsappTemplates',
          title: 'WhatsApp Message Templates',
          type: 'object',
          fields: [
            defineField({
              name: 'default',
              title: 'Default Message',
              type: 'string'
            }),
            defineField({
              name: 'services',
              title: 'Services Inquiry',
              type: 'text'
            }),
            defineField({
              name: 'consultation',
              title: 'Consultation Request',
              type: 'text'
            })
          ]
        }),
        defineField({
          name: 'availability',
          title: 'Availability Messages',
          type: 'object',
          fields: [
            defineField({
              name: 'hours',
              title: 'Business Hours',
              type: 'string'
            }),
            defineField({
              name: 'response',
              title: 'Response Time',
              type: 'string'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})