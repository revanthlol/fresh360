import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'enquiry',
  title: 'Legacy Enquiry',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name (Legacy)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
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
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject (Legacy)',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
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
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At (Legacy)',
      type: 'datetime',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
    }),
  ],
})
