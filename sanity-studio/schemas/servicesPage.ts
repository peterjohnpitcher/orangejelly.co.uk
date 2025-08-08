import { defineType } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Services Page Content'
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string'
        },
        {
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'introSection',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          validation: (Rule) => Rule.required()
        }
      ]
    },
    {
      name: 'processSection',
      title: 'How It Works Process',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'stepNumber',
                  title: 'Step Number',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(1).max(10)
                },
                {
                  name: 'title',
                  title: 'Step Title',
                  type: 'string',
                  validation: (Rule) => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'text',
                  validation: (Rule) => Rule.required()
                }
              ]
            }
          ],
          validation: (Rule) => Rule.required().min(1)
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string'
        },
        {
          name: 'ctaSubtext',
          title: 'CTA Subtext',
          type: 'string'
        }
      ]
    },
    {
      name: 'guaranteeSection',
      title: 'Money-Back Guarantee Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'description',
          title: 'Guarantee Description',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'checkmarkText',
          title: 'Checkmark Text',
          type: 'string'
        },
        {
          name: 'checkmarkSubtext',
          title: 'Checkmark Subtext',
          type: 'string'
        }
      ]
    },
    {
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ]
    },
    {
      name: 'ctaSection',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'subtitle',
          title: 'CTA Subtitle',
          type: 'text',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'whatsappMessage',
          title: 'WhatsApp Message',
          type: 'string'
        },
        {
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'relatedLinksSection',
      title: 'Related Links Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string'
        },
        {
          name: 'clusterId',
          title: 'Cluster ID',
          type: 'string',
          description: 'ID for fetching related links from Sanity'
        }
      ]
    },
    {
      name: 'speakableContent',
      title: 'Voice Search Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
});