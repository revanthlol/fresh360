import type { BrandId } from './types'

export const brandScenes: { id: BrandId; name: string; image: string; alt: string; tagline: string; description: string; accent: string }[] = [
  { id: 'juicera', name: 'Juicera', image: '/images/juicera.png', alt: 'Juicera Citrovit, Elixir and Almond Delight bottles with their ingredients', tagline: 'Cold-pressed juice', description: 'A fruit and nut range made for fresh, everyday drinking.', accent: '#2D6A2D' },
  { id: 'fruizy', name: 'Fruizy', image: '/images/fruizy.png', alt: 'Four Fruizy sparkling fruit drink bottles', tagline: 'Sparkling fruit', description: 'Fruit-led drinks with a lively sparkling finish.', accent: '#0F766E' },
  { id: 'fizzo', name: 'Fizzo', image: '/images/fizzo.png', alt: 'Fizzo Lime, Blue Mojito, Chilli Mango and Root Beer bottles', tagline: 'Bold fizzy flavours', description: 'An artificially flavoured fizzy beverage line.', accent: '#C2410C' },
]

export type BrandSceneData = typeof brandScenes[number]
