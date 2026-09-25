import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inquiry',
  title: 'Customer Inquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'brandInterest',
      title: 'Brand Interest',
      type: 'string',
      options: {
        list: [
          { title: 'Juicera (100% Pure Cold-Pressed)', value: 'Juicera' },
          { title: 'Fruizy (Cold-Pressed + Sparkle)', value: 'Fruizy' },
          { title: 'Both Brands', value: 'Both' },
          { title: 'General / Other', value: 'General' },
        ],
      },
      initialValue: 'General',
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'Partnership Inquiry', value: 'Partnership Inquiry' },
          { title: 'Bulk / Business Order', value: 'Bulk/Business Order' },
          { title: 'Franchise Opportunity', value: 'Franchise Opportunity' },
          { title: 'General Feedback', value: 'Feedback' },
          { title: 'Other Inquiry', value: 'Other' },
        ],
      },
      initialValue: 'Partnership Inquiry',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Resolved', value: 'resolved' },
        ],
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private operational notes for staff regarding follow-ups, calls, or status updates.',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'inquiryType',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ title, subtitle, status, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''
      return {
        title: title || 'Anonymous Inquiry',
        subtitle: `${subtitle || 'General'} · [${(status || 'new').toUpperCase()}] ${date}`,
      }
    },
  },
})
