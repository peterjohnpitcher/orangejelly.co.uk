import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'trustBadge',
  title: 'Trust Badge',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main badge text (e.g., "No Agency Fees")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Supporting text (e.g., "Just honest pricing")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier or emoji',
      options: {
        list: [
          { title: 'Money', value: 'money' },
          { title: 'Clock', value: 'clock' },
          { title: 'Shield', value: 'shield' },
          { title: 'Star', value: 'star' },
          { title: 'Check', value: 'check' },
          { title: 'Heart', value: 'heart' },
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Teal', value: 'teal' },
          { title: 'Default', value: 'default' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether to show this badge',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      icon: 'icon',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, icon, active } = selection;
      const iconMap = {
        money: '💰',
        clock: '⏰',
        shield: '🛡️',
        star: '⭐',
        check: '✅',
        heart: '❤️',
      };
      return {
        title: title,
        subtitle: `${subtitle} ${active ? '✓' : '✗'}`,
        // media: iconMap[icon] || '📌', // Can't use JSX in schema files
      };
    },
  },
})