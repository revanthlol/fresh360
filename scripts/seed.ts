import './load-env'
import { writeClient } from '../sanity/client'

const brands = [
  {
    _id: 'brand-juicera',
    _type: 'brand',
    name: 'Juicera',
    id: { _type: 'slug', current: 'juicera' },
    tagline: '100% Cold Pressed. Nothing Added. Nothing Removed.',
    description: 'Juicera is our flagship cold-pressed line. Every bottle is made from handpicked fruits and nuts, cold-pressed within hours of sourcing to lock in maximum nutrition. No preservatives, no added sugar, no artificial flavours or colours. Just pure, living juice the way nature intended.',
    color: '#2D6A2D',
    primaryColor: '#2D6A2D',
    usps: ['No Preservatives', 'No Added Sugar', 'Cold Pressed Within Hours', 'Farm Sourced Ingredients'],
    slug: { _type: 'slug', current: 'juicera' },
  },
  {
    _id: 'brand-fruizy',
    _type: 'brand',
    name: 'Fruizy',
    id: { _type: 'slug', current: 'fruizy' },
    tagline: 'Cold Pressed Freshness. Now With a Fizz.',
    description: 'Fruizy blends real cold-pressed fruit juices with sparkling water — no artificial additives, No Added Sugar, and zero shortcuts. A better-for-you fizzy drink crafted from real fruit.',
    color: '#0F766E',
    primaryColor: '#0F766E',
    usps: ['Real Cold Pressed Juice Base', 'Natural Carbonation', 'No Artificial Additives', 'No Added Sugar'],
    slug: { _type: 'slug', current: 'fruizy' },
  },
]

const products = [
  // JUICERA
  {
    _id: 'product-elixir',
    _type: 'product',
    name: 'Elixir',
    slug: { _type: 'slug', current: 'elixir' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'cold-pressed-juice',
    tagline: 'The antioxidant powerhouse',
    description: 'A potent cold-pressed blend of pomegranate, ginger, and lemon. Elixir is packed with antioxidants that fight free radicals, support heart health, and give your skin a natural glow. One bottle a day keeps the doctor curious.',
    ingredients: ['Pomegranate', 'Ginger', 'Lemon'],
    benefits: ['Removes free radicals and protects cells', 'Prevents platelet clumping', 'Prevents buildup of cholesterol in arteries', 'Improves digestion', 'Anti-aging properties', 'Anti-viral properties', 'Reduces oxidative stress'],
    featured: true,
    sortOrder: 1,
  },
  {
    _id: 'product-citrovit',
    _type: 'product',
    name: 'Citrovit',
    slug: { _type: 'slug', current: 'citrovit' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'cold-pressed-juice',
    tagline: 'Vitamin-dense daily fuel',
    description: 'Cold-pressed Valencia orange, carrot, ginger, and lemon in one power-packed bottle. Citrovit is your daily dose of Vitamin A, C, and beta-carotene. Supports immunity, skin health, and brain function — every single morning.',
    ingredients: ['Valencia Orange', 'Carrot', 'Ginger', 'Lemon'],
    benefits: ['Stronger vision', 'Radiant skin and hair', 'Regulates blood pressure', 'Improves blood circulation', 'Lowers cholesterol', 'Prevents kidney stones', 'Boosts immune system', 'Increases metabolism', 'Strengthens brain functions'],
    featured: true,
    sortOrder: 2,
  },
  {
    _id: 'product-purify',
    _type: 'product',
    name: 'Purify',
    slug: { _type: 'slug', current: 'purify' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'cold-pressed-juice',
    tagline: 'Detox from the inside out',
    description: 'Beetroot, orange, pomegranate, ginger, and lemon — five heavy hitters in one deep-cleansing bottle. Purify supports liver function, combats anaemia, lowers blood pressure, and gives you that unmistakable post-detox glow.',
    ingredients: ['Beetroot', 'Orange', 'Pomegranate', 'Ginger', 'Lemon'],
    benefits: ['Supports liver function', 'Combats anaemia', 'Prevents arteriosclerosis', 'Helps lower blood pressure', 'Lowers blood sugar', 'Improves stamina and muscle power', 'Maintains healthy weight', 'Prevents dementia', 'Improves digestion'],
    featured: true,
    sortOrder: 3,
  },
  {
    _id: 'product-refresh',
    _type: 'product',
    name: 'Refresh',
    slug: { _type: 'slug', current: 'refresh' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'cold-pressed-juice',
    tagline: 'Cold-pressed tropical revival',
    description: 'Kiwi, pineapple, ginger, and lemon — a tropical escape in a 200ml bottle. Refresh is anti-inflammatory, aids digestion, promotes bone health, and keeps your skin looking youthful. The one you reach for after a long day.',
    ingredients: ['Kiwi', 'Pineapple', 'Ginger', 'Lemon'],
    benefits: ['Youthful skin and anti-aging', 'Lowers risk of coronary heart diseases', 'Boosts immune system', 'Aids digestion', 'Anti-inflammatory', 'Reduces risk of cataract', 'Natural diuretic', 'Promotes bone health'],
    featured: false,
    sortOrder: 4,
  },
  {
    _id: 'product-almond-crush',
    _type: 'product',
    name: 'Almond Crush',
    slug: { _type: 'slug', current: 'almond-crush' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'nut-milk',
    tagline: 'Skin, hair and calm in a bottle',
    description: 'Cold-pressed almond milk with Madagascar vanilla extract, Sundarban honey, chia seeds, and cinnamon. Almond Crush is a nutrient-dense dairy alternative that is low in calories, high in Vitamin E, and deeply nourishing for skin and hair.',
    ingredients: ['Cold-Pressed Almond Milk', 'Madagascar Vanilla Extract', 'Sundarban Honey', 'Chia Seeds', 'Cinnamon', 'Sea Salt'],
    benefits: ['Low in calories, great for weight management', 'Improves heart health', 'Low in sugar', 'Reduces risk of Alzheimer\'s disease', 'Combats inflammation', 'Prevents macular degeneration', 'Beautiful skin and hair via Vitamin E', 'Helps alleviate anxiety and depression'],
    featured: true,
    sortOrder: 5,
  },
  {
    _id: 'product-almond-delight',
    _type: 'product',
    name: 'Almond Delight',
    slug: { _type: 'slug', current: 'almond-delight' },
    brand: { _type: 'reference', _ref: 'brand-juicera' },
    category: 'nut-milk',
    tagline: 'Saffron luxury, cold-pressed clean',
    description: 'Cold-pressed almond milk with Kashmiri saffron, Sundarban honey, and chia seeds. Almond Delight is our premium nut milk — luxurious, subtly floral, and loaded with the aphrodisiac and neuro-protective properties of real Kashmiri saffron.',
    ingredients: ['Cold-Pressed Almond Milk', 'Kashmiri Saffron', 'Sundarban Honey', 'Chia Seeds', 'Sea Salt'],
    benefits: ['Kashmiri saffron neuro-protection', 'Low in calories', 'Improves heart health', 'Combats inflammation', 'Beautiful skin and hair via Vitamin E', 'Aphrodisiac properties', 'Helps alleviate anxiety and depression'],
    featured: false,
    sortOrder: 6,
  },
  // FRUIZY
  {
    _id: 'product-elixir-fizz',
    _type: 'product',
    name: 'Elixir Fizz',
    slug: { _type: 'slug', current: 'elixir-fizz' },
    brand: { _type: 'reference', _ref: 'brand-fruizy' },
    category: 'carbonated',
    tagline: 'Your antioxidants just got a fizz upgrade',
    description: 'Everything in our Elixir, now with natural carbonation. Pomegranate, ginger, and lemon cold-pressed and blended with sparkling water. All the antioxidant power of Elixir with a refreshing fizz that makes healthy drinking feel like a treat.',
    ingredients: ['Pomegranate', 'Ginger', 'Lemon', 'Carbonated Water'],
    benefits: ['Antioxidant powerhouse', 'No artificial additives', 'No Added Sugar', 'Naturally carbonated'],
    featured: true,
    sortOrder: 1,
  },
  {
    _id: 'product-citrovit-fizz',
    _type: 'product',
    name: 'Citrovit Fizz',
    slug: { _type: 'slug', current: 'citrovit-fizz' },
    brand: { _type: 'reference', _ref: 'brand-fruizy' },
    category: 'carbonated',
    tagline: 'Vitamin C with a spark',
    description: 'Orange, carrot, ginger, and lemon — cold-pressed and carbonated. Citrovit Fizz is your guilt-free alternative to packaged fizzy drinks. All the vitamins, none of the artificial junk.',
    ingredients: ['Valencia Orange', 'Carrot', 'Ginger', 'Lemon', 'Carbonated Water'],
    benefits: ['Rich in Vitamin C', 'No artificial additives', 'No Added Sugar', 'Naturally carbonated'],
    featured: false,
    sortOrder: 2,
  },
  {
    _id: 'product-purify-fizz',
    _type: 'product',
    name: 'Purify Fizz',
    slug: { _type: 'slug', current: 'purify-fizz' },
    brand: { _type: 'reference', _ref: 'brand-fruizy' },
    category: 'carbonated',
    tagline: 'Detox meets sparkle',
    description: 'Beetroot, orange, and pomegranate cold-pressed and carbonated. Purify Fizz brings detox to the fizzy drink category. Bold colour, bold flavour, zero compromise.',
    ingredients: ['Beetroot', 'Orange', 'Pomegranate', 'Carbonated Water'],
    benefits: ['Antioxidant powerhouse', 'No artificial additives', 'No Added Sugar', 'Naturally carbonated'],
    featured: false,
    sortOrder: 3,
  },
  {
    _id: 'product-refresh-fizz',
    _type: 'product',
    name: 'Refresh Fizz',
    slug: { _type: 'slug', current: 'refresh-fizz' },
    brand: { _type: 'reference', _ref: 'brand-fruizy' },
    category: 'carbonated',
    tagline: 'Tropical fizz, zero guilt',
    description: 'Kiwi, pineapple, and ginger cold-pressed and carbonated. Refresh Fizz is the tropical fizzy drink you always wanted — real fruit, real fizz, no regrets.',
    ingredients: ['Kiwi', 'Pineapple', 'Ginger', 'Carbonated Water'],
    benefits: ['Digestive enzyme rich', 'No artificial additives', 'No Added Sugar', 'Naturally carbonated'],
    featured: true,
    sortOrder: 4,
  },
]

async function main() {
  console.log('🚀 Starting seed process...')

  try {
    // 1. Seed Brands
    console.log('\n📦 Seeding Brands...')
    for (const brand of brands) {
      await writeClient.createOrReplace(brand)
      console.log(`✓ Brand: ${brand.name}`)
    }

    // 2. Seed Products
    console.log('\n📦 Seeding Products...')
    for (const product of products) {
      await writeClient.createOrReplace(product)
      console.log(`✓ Product: ${product.name}`)
    }

    console.log(`\n✅ Seed complete: 2 brands, 10 products`)
  } catch (error) {
    console.error('\n❌ Seed failed:')
    console.error(error)
    process.exit(1)
  }
}

main()
