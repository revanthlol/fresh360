import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'status',
      title: 'Subscription Status',
      type: 'string',
      options: {
        list: [
          { title: 'Subscribed', value: 'subscribed' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'subscribed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'source',
      title: 'Signup Source',
      type: 'string',
      initialValue: 'website_newsletter',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString('en-IN') : ''
      return {
        title: title || 'Subscriber',
        subtitle: `[${(status || 'subscribed').toUpperCase()}] ${date}`,
      }
    },
  },
})
