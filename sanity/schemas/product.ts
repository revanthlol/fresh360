import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cold Pressed Juice', value: 'cold-pressed-juice' },
          { title: 'Nut Milk', value: 'nut-milk' },
          { title: 'Carbonated Juice', value: 'carbonated' },
          { title: 'Goli Soda', value: 'goli-soda' },
          { title: 'Artificially Flavoured Fizzy Beverage', value: 'artificially-flavoured-fizzy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Optional. Add only when product copy is confirmed.',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional. Leave blank until product details are confirmed.',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional. Use only the verified ingredient list.',
    }),
    defineField({
      name: 'tasteNotes',
      title: 'Taste notes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Confirmed flavour characteristics, not health benefits.',
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'servingSuggestion',
      title: 'Best with',
      type: 'string',
    }),
    defineField({
      name: 'labelStatements',
      title: 'Label statements',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Confirmed declarations from the bottle label.',
    }),
    defineField({
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Set only when confirmed by the product label.',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional until a matching product photo is available.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
})
