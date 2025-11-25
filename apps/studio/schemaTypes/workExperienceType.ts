import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const workExperienceType = defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      validation: (rule) => rule.required().error('Company name is required'),
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required().error('Job title/role is required'),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (rule) => rule.required().error('Start date is required'),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      description: 'Leave empty if this is your current position',
      options: {
        dateFormat: 'MMMM YYYY',
      },
    }),
    defineField({
      name: 'current',
      type: 'string',
      description: 'Is this your current position?',
      options: {
        list: [
          {title: 'Yes', value: 'yes'},
          {title: 'No', value: 'no'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Please indicate if this is a current position'),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Order to display (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      company: 'company',
      role: 'role',
      startDate: 'startDate',
      endDate: 'endDate',
      current: 'current',
    },
    prepare({company, role, startDate, endDate, current}) {
      const start = startDate
        ? new Date(startDate).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          })
        : ''
      const end =
        current === 'yes'
          ? 'Present'
          : endDate
            ? new Date(endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })
            : ''
      const dateRange = start && end ? `${start} - ${end}` : ''

      return {
        title: company,
        subtitle: `${role}${dateRange ? ` • ${dateRange}` : ''}`,
        media: CaseIcon,
      }
    },
  },
})
