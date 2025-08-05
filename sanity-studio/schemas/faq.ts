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
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
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