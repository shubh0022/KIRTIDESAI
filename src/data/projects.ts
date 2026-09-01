import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-01',
    slug: 'pattern-making',
    title: 'Pattern Making & Garment Construction',
    subtitle: 'Victorian Corsetry with Indian Craft Techniques',
    projectNumber: '01',
    year: '2025',
    date: 'DECEMBER 2025',
    category: 'GARMENT CONSTRUCTION',
    summary:
      'Exploring wearable structure, balance and silhouette through pattern development, draping and precise construction. Featuring a Victorian-style corset integrated with Indian craft techniques.',
    heroImage: '/images/projects/pattern-toile-large.jpg',
    heroImageAlt: 'Muslin toile draping on mannequin exploring structural balance and waist suppression',
    coverImage: '/images/projects/card-01-pattern.jpg',
    disciplines: ['GARMENT DRAFTING', 'CORSETRY', 'INDIAN CRAFT', 'PATTERN MAKING'],
    materialsUsed: ['Raw Silk', 'Cotton Muslin', 'Steel Boning', 'Embroidered Zari Thread', 'Eyelet Fasteners'],
    brief:
      'The brief required developing a structurally precise garment utilizing classical pattern drafting methods, exploring how historical western corsetry can be re-imagined through traditional Indian craft and silhouette construction.',
    research:
      'Research investigated historical Victorian corset drafting systems, posture mechanics, and boning channels, paired with regional Indian embellishment and high-collar tailoring techniques.',
    inspiration:
      'The juxtaposition between the rigid architectural restraint of Victorian corsetry and the organic fluidity of Indian floral craft motifs.',
    materials:
      'Structured cotton canvas for foundation strength, unbleached muslin for trial toiles, heavy weight natural silk for the shell, and bespoke hand-embroidery thread for ornamental surface detailing.',
    experimentation:
      'Extensive paper pattern drafting and 3D muslin draping on dress forms to achieve an exact anatomical fit while balancing ease of movement and neckline transitions.',
    development:
      'Multiple iterative fittings to refine panel curvature, waist suppression, boning placement, and seam transitions between the bodice and integrated collar.',
    construction:
      'Multi-panel construction with reinforced boning channels, precision topstitching, hand-finished armholes, eyelet closures, and delicate floral threadwork.',
    finalResult:
      'A sculptural, high-necked Victorian-style corset garment that merges rigorous western tailoring with Indian craft sensibilities.',
    reflection:
      'This project deepened my technical command over pattern drafting geometries and proved how historical European garment forms can find contemporary expression through Indian craft vocabulary.',
    stages: [
      {
        id: 'stage-01',
        number: '01',
        name: 'CONCEPT & DRAFTING',
        description:
          'Constructing 2D flat patterns and translating them into 3D muslin drapes to establish accurate balance lines, grain alignment, and waist curve geometry.',
        images: [
          {
            src: '/images/projects/pattern-scissors-draft.jpg',
            alt: 'Pattern drafting paper and tailor scissors',
            caption: 'Flat pattern layout, measurement calibration, and cutting layout.',
          },
          {
            src: '/images/projects/pattern-toile-large.jpg',
            alt: 'Muslin draping exploration on mannequin',
            caption: 'Toile draping on dress form to establish silhouette proportions and volume.',
          },
        ],
        notes: [
          'Calculated waist suppression and panel curve radius.',
          'Tested muslin grainline stability under tension.',
        ],
      },
      {
        id: 'stage-02',
        number: '02',
        name: 'DEVELOPMENT & DRAPING',
        description:
          'Engineering internal structural support and draping on live dress forms to maintain clean vertical lines and supportive tension.',
        images: [
          {
            src: '/images/projects/pattern-model-draping.jpg',
            alt: 'Draping and fitting adjustment on dress form',
            caption: 'Pinning and contouring the bodice seams directly on the mannequin.',
          },
          {
            src: '/images/projects/pattern-sewing-detail.jpg',
            alt: 'Precision sewing machine stitching',
            caption: 'Close-up precision stitch lines along structural boning channels.',
          },
        ],
        notes: [
          'Reinforced waistline seams to prevent torque.',
          'Incorporated flexible boning for anatomical contouring.',
        ],
      },
      {
        id: 'stage-03',
        number: '03',
        name: 'FINAL GARMENT & CRAFT INTEGRATION',
        description:
          'Integrating delicate Indian floral needlework along the center front panels, framing the closure with hand-worked botanical motifs.',
        images: [
          {
            src: '/images/kirti/projects/pattern-corset-detail.jpg',
            alt: 'Center front embroidery detail',
            caption: 'Handcrafted floral embroidery running alongside the front eyelet placket.',
          },
          {
            src: '/images/projects/card-01-pattern.jpg',
            alt: 'Full finished mannequin look',
            caption: 'Completed corset garment with tailored stand collar.',
          },
        ],
        notes: [
          'Hand-embroidered using tonal and contrast natural threads.',
          'Collar tailored with structured stand-and-fall geometry.',
        ],
      },
    ],
    gallery: [
      { src: '/images/projects/pattern-toile-large.jpg', alt: 'Toile Drape Study', title: 'Toile Drape Study', type: 'portrait' },
      { src: '/images/projects/pattern-scissors-draft.jpg', alt: 'Pattern Drafting & Cut', title: 'Pattern Drafting & Cut', type: 'detail' },
      { src: '/images/projects/pattern-model-draping.jpg', alt: 'Dress Form Fitting', title: 'Dress Form Fitting', type: 'detail' },
      { src: '/images/projects/pattern-sewing-detail.jpg', alt: 'Precision Topstitching', title: 'Precision Topstitching', type: 'detail' },
      { src: '/images/kirti/projects/pattern-corset-detail.jpg', alt: 'Hand Embroidered Placket', title: 'Hand Embroidered Placket', type: 'detail' },
    ],
    featured: true,
    order: 1,
    published: true,
  },
  {
    id: 'project-02',
    slug: 'athleisure',
    title: 'Athleisure Wear',
    subtitle: 'Sustainable Khadi & Architectural Form',
    projectNumber: '02',
    year: '2025',
    date: 'JULY 2025',
    category: 'SUSTAINABLE ATHLEISURE',
    summary:
      'A sustainable Khadi athleisure garment based on a concept inspired by Rajasthan Bharat Bhavan. Bridging breathable handloom textures with modern kinetic ergonomics.',
    heroImage: '/images/projects/card-02-athleisure.jpg',
    heroImageAlt: 'Sustainable Khadi athleisure textile and silhouette exploration',
    coverImage: '/images/projects/card-02-athleisure.jpg',
    disciplines: ['KHADI TEXTILE', 'SUSTAINABLE FASHION', 'ATHLEISURE', 'ERGONOMICS'],
    materialsUsed: ['Handspun Khadi Cotton', 'Natural Dyes', 'Elasticated Ribbing', 'Eco-fasteners'],
    brief:
      'To design a modern athleisure capsule utilizing handspun Khadi, bridging functional movement with sustainable textile heritage inspired by the architectural and cultural spirit of Rajasthan Bharat Bhavan.',
    research:
      'Examined the thermal breathing properties and drape qualities of handwoven Khadi alongside the geometric arches and stone textures of Rajasthan Bharat Bhavan.',
    inspiration:
      'Rajasthan Bharat Bhavan—its geometric interplay of light, shadow, stone jalis, and the timeless simplicity of handwoven Indian cotton.',
    materials:
      'Pure organic handspun and handwoven Khadi cotton with natural breathable weave characteristics, dyed using earth-derived pigment tones.',
    experimentation:
      'Testing Khadi under mechanical stress and kinetic movements to introduce ergonomic ease without compromising the natural texture of the weave.',
    development:
      'Drafting raglan cuts, gusseted underarms, and breathable paneling tailored for flexible, relaxed contemporary wear.',
    construction:
      'Double-stitched stress points, clean bias-bound seam allowances, and minimal hardware to maintain zero-waste ethos.',
    finalResult:
      'A functional, earth-toned athleisure concept celebrating Khadi as an active, breathable modern material.',
    reflection:
      'Demonstrated that traditional Indian handlooms possess superior comfort and breathability for modern lifestyle garments when thoughtfully engineered.',
    stages: [
      {
        id: 'stage-01',
        number: '01',
        name: 'ARCHITECTURAL RESEARCH & MOOD MAPPING',
        description:
          'Drawing architectural proportions from Rajasthan Bharat Bhavan to inform panel geometry and structural drape lines.',
        images: [
          {
            src: '/images/projects/card-02-athleisure.jpg',
            alt: 'Khadi athleisure construction sample',
            caption: 'Mannequin fitting demonstrating contoured raglan seam lines and breathable panels.',
          },
        ],
        notes: ['Derived silhouette lines from Rajasthani architectural facades.'],
      },
    ],
    gallery: [
      { src: '/images/projects/card-02-athleisure.jpg', alt: 'Khadi athleisure texture', title: 'Khadi Athleisure Form', type: 'detail' },
      { src: '/images/kirti/craft/textile-swatch-clay.jpg', alt: 'Natural dye swatch', title: 'Mineral Dye Swatch', type: 'detail' },
    ],
    featured: true,
    order: 2,
    published: true,
  },
  {
    id: 'project-03',
    slug: 'craft-study',
    title: 'Craft Study',
    subtitle: 'Lac Craft · Pipli Work · Bagh Print',
    projectNumber: '03',
    year: '2024',
    date: 'MARCH 2024',
    category: 'CRAFT RESEARCH',
    summary:
      'An in-depth research and tactile documentation project focusing on Lac Craft, Pipli Work, and Bagh Print. Analyzing living techniques, surface ornamentation, and contemporary garment relevance.',
    heroImage: '/images/projects/card-03-craft.jpg',
    heroImageAlt: 'Rich tactile craft research documentation showcasing Lac craft beads, Pipli appliqué and Bagh print',
    coverImage: '/images/projects/card-03-craft.jpg',
    disciplines: ['CRAFT DOCUMENTATION', 'TEXTILE RESEARCH', 'PIPLI APPLIQUÉ', 'BAGH PRINT', 'LAC CRAFT'],
    materialsUsed: ['Natural Lac Resin', 'Cotton Canvas', 'Woodblock Vegetable Pigments', 'Mirror Inserts'],
    brief:
      'To document, analyze, and engage directly with three distinct indigenous Indian craft traditions—Lac Craft, Pipli Work, and Bagh Print—studying their material origins, artisan workflows, and design applications.',
    research:
      'Field-level observation and technical breakdown of natural resin heating (Lac), layered hand appliqué (Pipli), and mineral-dye hand-block printing (Bagh).',
    inspiration:
      'The living heritage of Indian craft communities, their generational wisdom in raw materials, and the sensory richness of handmade textiles.',
    materials:
      'Natural lac resin, mirror glass shards, natural indigo, iron sludge, alum mordant, handloom base cotton, and vibrant appliqué fabric scraps.',
    experimentation:
      'Translating traditional motif geometries into contemporary fashion detailing and testing fabric compatibility for wearable garments.',
    development:
      'Color story generation pairing terracotta clay, indigo blue, and natural ivory alongside reflective mirror accents.',
    construction:
      'Hand-cut fabric layering, dense edge embroidery, block alignment experiments, and temperature-controlled resin molding.',
    finalResult:
      'A comprehensive craft archive providing a rich foundation for contemporary garment collections and artisan collaborations.',
    reflection:
      'Working closely with craft traditions reinforced the importance of preserving artisan techniques while creating viable, contemporary fashion avenues.',
    stages: [
      {
        id: 'stage-01',
        number: '01',
        name: 'LAC CRAFT & SURFACE RESIN',
        description:
          'Studying the thermal melting, pigment blending, and manual shaping of raw natural lac resin over charcoal embers.',
        images: [
          {
            src: '/images/projects/card-03-craft.jpg',
            alt: 'Lac craft natural beads sample',
            caption: 'Concentric strands of heated and molded lac resin with natural mineral pigments.',
          },
        ],
        notes: ['Explored thermal timing and mirror glass inlay stability.'],
      },
      {
        id: 'stage-02',
        number: '02',
        name: 'PIPLI APPLIQUÉ & BAGH PRINTING',
        description:
          'Documenting circular geometric needlework from Odisha and carved teak woodblock iron-mordant prints from Madhya Pradesh.',
        images: [
          {
            src: '/images/kirti/craft/pipli-work-study.jpg',
            alt: 'Pipli work medallion',
            caption: 'Detailed circular Pipli work sample displaying dense stitching and symmetry.',
          },
        ],
        notes: ['Analyzed geometric repetition and contrasting fabric colorways.'],
      },
    ],
    gallery: [
      { src: '/images/projects/card-03-craft.jpg', alt: 'Lac craft research', title: 'Lac Craft Documentation', type: 'detail' },
      { src: '/images/kirti/craft/pipli-work-study.jpg', alt: 'Pipli medallion', title: 'Pipli Appliqué Study', type: 'detail' },
      { src: '/images/kirti/craft/textile-swatch-clay.jpg', alt: 'Clay textile swatch', title: 'Mineral Dye Swatch', type: 'detail' },
    ],
    featured: true,
    order: 3,
    published: true,
  },
  {
    id: 'project-04',
    slug: 'apparel-merchandising',
    title: 'Apparel Merchandising & Production',
    subtitle: 'Reversible & Travel-Friendly Jumpsuit Concept',
    projectNumber: '04',
    year: '2024',
    date: 'AUG - OCT 2024',
    category: 'APPAREL MERCHANDISING',
    summary:
      'A reversible, travel-friendly jumpsuit brand concept featuring value wear, multi-functional utilities, and smart storage design.',
    heroImage: '/images/projects/card-04-merchandising.jpg',
    heroImageAlt: 'Apparel merchandising technical garment zipper and reversible seam detailing',
    coverImage: '/images/projects/card-04-merchandising.jpg',
    disciplines: ['PRODUCT DEVELOPMENT', 'APPAREL MERCHANDISING', 'MODULAR DESIGN', 'PRODUCTION PLANNING'],
    materialsUsed: ['Wrinkle-resistant Blends', 'Dual-sided Zippers', 'Concealed Magnetic Closures', 'Reinforced Pockets'],
    brief:
      'To conceptualize and engineer a commercially viable, travel-focused garment offering dual-sided wearability, integrated pocket storage, and streamlined production cost efficiency.',
    research:
      'Analyzed travel apparel market gaps, consumer pain points regarding luggage constraints, and reversible construction methodologies.',
    inspiration:
      'Modern nomadic lifestyles, functional utility workwear, and minimalist travel wardrobes where one garment fulfills multiple styling contexts.',
    materials:
      'Durable, crease-resistant lightweight fabrications with clean internal seam bindings capable of presenting a pristine finish on both sides.',
    experimentation:
      'Prototyping reversible zipper configurations, seamless pocket bags, and balanced collar geometries that fold symmetrically inside-out.',
    development:
      'Creating technical specification sheets (tech packs), grading charts, bill of materials (BOM), and assembly sequence plans.',
    construction:
      'French seams throughout, dual-headed reversible zippers, and modular convertible pocket compartments.',
    finalResult:
      'A comprehensive product development proposal featuring a fully reversible jumpsuit suited for versatile travel needs.',
    reflection:
      'Bridged the gap between creative silhouette design and industrial manufacturing feasibility, deepening understanding of unit economics and tech pack accuracy.',
    stages: [
      {
        id: 'stage-01',
        number: '01',
        name: 'REVERSIBLE CONSTRUCTION & TECH PACK',
        description:
          'Developing reversible seam assemblies and pocket construction specs that maintain clean aesthetics on both exterior faces.',
        images: [
          {
            src: '/images/projects/card-04-merchandising.jpg',
            alt: 'Reversible closure detail',
            caption: 'Technical zipper closure and clean-finish seam binding.',
          },
        ],
        notes: ['Engineered dual-face pocket access without bulky layers.'],
      },
    ],
    gallery: [
      { src: '/images/projects/card-04-merchandising.jpg', alt: 'Technical zipper and seam', title: 'Reversible Seam Detail', type: 'detail' },
    ],
    featured: true,
    order: 4,
    published: true,
  },
  {
    id: 'project-05',
    slug: 'wearable-art',
    title: 'Wearable Art',
    subtitle: 'Death of Fear and Blood',
    projectNumber: '05',
    year: '2024–2025',
    date: 'DEC 2024 – FEB 2025',
    category: 'CONCEPTUAL WEARABLE ART',
    summary:
      'An avant-garde wearable art exploration built around the conceptual theme "Death of Fear and Blood". Exploring textural depth, emotional intensity, and sculptural drapery.',
    heroImage: '/images/projects/card-05-wearable-art.jpg',
    heroImageAlt: 'Sculptural crimson and deep-red avant-garde wearable art silhouette with rich tactile texture',
    coverImage: '/images/projects/card-05-wearable-art.jpg',
    disciplines: ['WEARABLE ART', 'CONCEPTUAL DESIGN', 'SCULPTURAL FORM', 'EXPERIMENTAL TEXTILES'],
    materialsUsed: ['Textured Crimson Textiles', 'Raw Edge Shredding', 'Distressed Fibers', 'Structural Wire Armature'],
    brief:
      'To create a conceptual wearable art piece exploring internal human turmoil, vulnerability, and the cathartic transcendence over fear.',
    research:
      'Studied anatomical musculature, symbolic representations of blood as life force, and expressive textile distressing techniques.',
    inspiration:
      'The emotional transition from fear-induced paralysis to liberated empowerment—manifested as raw, cascading crimson textures.',
    materials:
      'Layered crimson and scarlet fabrics, shredded raw fibers, heat-manipulated textiles, and skeletal wire armatures.',
    experimentation:
      'Distressing, burning, tearing, and sculptural manipulation of fabric surfaces to evoke raw emotional intensity.',
    development:
      'Molding dynamic, organic volumes that extend outward from the torso in sharp, dramatic sculptural waves.',
    construction:
      'Armature-supported drapery, hand-knotted thread tendrils, and multi-layered textural assemblage.',
    finalResult:
      'A powerful, visceral wearable sculpture that transforms raw emotion into high-contrast visual form.',
    reflection:
      'Pushed the boundaries beyond standard commercial silhouettes into pure expressive storytelling through texture and form.',
    stages: [
      {
        id: 'stage-01',
        number: '01',
        name: 'SCULPTURAL FORM & TEXTURAL ASSEMBLY',
        description:
          'Constructing expressive organic forms using distressed fibers and deep crimson pigmentation.',
        images: [
          {
            src: '/images/projects/card-05-wearable-art.jpg',
            alt: 'Sculptural red textile form',
            caption: 'Detailed view of the layered crimson wearable sculpture.',
          },
        ],
        notes: ['Explored dramatic volumetric balance and tactile tension.'],
      },
    ],
    gallery: [
      { src: '/images/projects/card-05-wearable-art.jpg', alt: 'Sculptural red wearable art form', title: 'Death of Fear and Blood', type: 'portrait' },
    ],
    featured: true,
    order: 5,
    published: true,
  },
];

// Helper to resolve project by slug (supporting both short and full slugs)
export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase();
  return projects.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      (normalized === 'pattern-making-and-garment-construction' && p.slug === 'pattern-making') ||
      (normalized === 'athleisure-wear' && p.slug === 'athleisure') ||
      (normalized === 'apparel-merchandising-and-production' && p.slug === 'apparel-merchandising')
  );
}
