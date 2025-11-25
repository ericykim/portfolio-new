import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'bio',
      type: 'array',
      description: 'Your bio or about me section',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        }),
      ],
      validation: (rule) => rule.required().error('Bio is required to describe yourself'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Profile',
        subtitle: 'About me section',
        media: UserIcon,
      }
    },
  },
})
