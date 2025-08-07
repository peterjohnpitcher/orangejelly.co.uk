import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'roiCalculator',
  title: 'ROI Calculator Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Calculate Your Time & Money Savings'
    }),
    defineField({
      name: 'hourlyValue',
      title: 'Hourly Value (£)',
      type: 'number',
      description: 'Conservative estimate of licensee hourly value',
      validation: Rule => Rule.required().min(0),
      initialValue: 25
    }),
    defineField({
      name: 'sliders',
      title: 'Calculator Sliders',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'id',
            title: 'Slider ID',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              list: [
                { title: 'Admin Hours', value: 'adminHours' },
                { title: 'Social Media Hours', value: 'socialMediaHours' },
                { title: 'Menu Updates', value: 'menuUpdates' },
                { title: 'Average Spend', value: 'averageSpend' }
              ]
            }
          }),
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'min',
            title: 'Minimum Value',
            type: 'number',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'max',
            title: 'Maximum Value',
            type: 'number',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'defaultValue',
            title: 'Default Value',
            type: 'number',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'unit',
            title: 'Unit',
            type: 'string',
            description: 'e.g., "h" for hours, "£" for currency'
          }),
          defineField({
            name: 'calculation',
            title: 'Calculation Factor',
            type: 'number',
            description: 'Multiplier for savings calculation',
            validation: Rule => Rule.min(0).max(1)
          })
        ],
        preview: {
          select: {
            title: 'label',
            subtitle: 'id'
          }
        }
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'resultMessages',
      title: 'Result Messages',
      type: 'object',
      fields: [
        defineField({
          name: 'hoursSavedLabel',
          title: 'Hours Saved Label',
          type: 'string',
          initialValue: 'Hours saved per month:'
        }),
        defineField({
          name: 'moneySavedLabel',
          title: 'Money Saved Label',
          type: 'string',
          initialValue: 'Value of time saved:'
        }),
        defineField({
          name: 'revenueIncreaseLabel',
          title: 'Revenue Increase Label',
          type: 'string',
          initialValue: 'Potential revenue increase:'
        }),
        defineField({
          name: 'totalBenefitLabel',
          title: 'Total Benefit Label',
          type: 'string',
          initialValue: 'Total monthly benefit:'
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Claim Your Time Back'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'ROI Calculator',
        subtitle: 'Calculator configuration'
      };
    }
  }
});