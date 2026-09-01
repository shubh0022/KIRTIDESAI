import { CraftStudy } from '@/types';

export const craftStudies: CraftStudy[] = [
  {
    id: 'lac-craft',
    title: 'LAC CRAFT',
    region: 'Rajasthan & Central India',
    date: 'MARCH 2024',
    year: '2024',
    category: 'NATURAL RESIN CRAFT',
    summary:
      'Exploring natural resin extraction, thermal manipulation, and surface ornamentation techniques used in traditional Indian embellishments and accessory craft.',
    technique: 'Thermal heating of raw lac resin, manual shaping on wooden spindles, and stone/mirror inlay.',
    materials: ['Natural Lac Resin', 'Mineral Color Pigments', 'Brass Core Rings', 'Faceted Glass Shards'],
    processNotes: [
      'Raw lac harvested from host trees is melted over gentle charcoal embers.',
      'Pigments are kneaded into the molten resin to achieve deep, lustrous opaque tones.',
      'Precision thermal timing is required to shape the material before solidification.',
    ],
    image: '/images/projects/card-03-craft.jpg',
    imageAlt: 'Rich warm terracotta textured material sample and lac craft resin study',
    relatedProjectSlug: 'craft-study',
    relatedProjectName: 'Craft Study',
  },
  {
    id: 'pipli-work',
    title: 'PIPLI WORK',
    region: 'Pipli, Odisha',
    date: 'MARCH 2024',
    year: '2024',
    category: 'APPLIQUÉ & NEEDLEWORK',
    summary:
      'Investigating the vibrant layered fabric appliqué, geometric symmetry, and mirror-work traditions of Odisha’s master artisans.',
    technique: 'Hand-cut fabric motifs, dense buttonhole edge embroidery, and reflective mirror anchoring.',
    materials: ['Natural Cotton Canvas', 'Vibrant Contrast Fabric Scraps', 'Embroidery Floss', 'Small Circular Mirrors'],
    processNotes: [
      'Patterns are drafted onto paper templates and hand-cut from contrasting dyed cloth.',
      'Each piece is basted and hand-stitched onto the heavy canvas ground using traditional border stitches.',
      'Concentric circles and floral stars create dynamic, radiant visual rhythms.',
    ],
    image: '/images/kirti/craft/pipli-work-study.jpg',
    imageAlt: 'Intricate circular Pipli appliqué needlework sample with traditional motifs and mirror inserts',
    relatedProjectSlug: 'craft-study',
    relatedProjectName: 'Craft Study',
  },
  {
    id: 'bagh-print',
    title: 'BAGH PRINT',
    region: 'Bagh, Madhya Pradesh',
    date: 'MARCH 2024',
    year: '2024',
    category: 'NATURAL BLOCK PRINTING',
    summary:
      'Documenting the natural vegetable and mineral dye block printing process on handloom cotton, characterized by geometric blocks and copper-rich river washing.',
    technique: 'Hand-carved teak wood blocks, natural iron-ferment black and alum-madder red mordants.',
    materials: ['Handspun Cotton', 'Teak Wood Carved Blocks', 'Fermented Iron & Jaggery Sludge', 'Alum & Madder Roots'],
    processNotes: [
      'Fabric undergoes rigorous scouring and castor oil conditioning before printing.',
      'Wooden blocks are hand-aligned with extreme rhythmic precision across repeat grids.',
      'River-water mineral chemistry fixes the brilliant earth reds and deep blacks.',
    ],
    image: '/images/kirti/craft/textile-swatch-clay.jpg',
    imageAlt: 'Clay and earthy natural mineral dye handloom textile swatch',
    relatedProjectSlug: 'craft-study',
    relatedProjectName: 'Craft Study',
  },
];
