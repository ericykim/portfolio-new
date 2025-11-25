import {BookIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const educationType = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'place',
      type: 'string',
      validation: (rule) => rule.required().error('Place/institution is required'),
    }),
    defineField({
      name: 'description',
      type: 'string',
      validation: (rule) => rule.required().error('Description is required'),
    }),
  ],
  preview: {
    select: {
      place: 'place',
      description: 'description',
    },
    prepare({place, description}) {
      return {
        title: place,
        subtitle: description,
        media: BookIcon,
      }
    },
  },
})
