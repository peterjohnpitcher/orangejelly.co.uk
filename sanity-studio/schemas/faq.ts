export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Service', value: 'service' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Process', value: 'process' },
          { title: 'Results', value: 'results' },
        ],
      },
    },
    {
      name: 'isVoiceOptimized',
      title: 'Voice Search Optimized',
      type: 'boolean',
      initialValue: false,
      description: 'Is this FAQ optimized for voice search?',
    },
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Services', value: 'services' },
          { title: 'Contact', value: 'contact' },
          { title: 'About', value: 'about' },
        ],
      },
      description: 'Which page this FAQ appears on',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'page',
      order: 'order',
    },
    prepare(selection: any) {
      const { title, subtitle, order } = selection;
      return {
        title,
        subtitle: `${subtitle || 'No page'} - Order: ${order || 0}`,
      };
    },
  },
};