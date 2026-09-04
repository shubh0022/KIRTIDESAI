export interface ProjectStage {
  title: string;
  subtitle?: string;
  content: string;
  keyDetails?: { label: string; value: string }[];
  image?: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  projectNumber: string;
  year: string;
  date: string;
  category: string;
  summary: string;
  heroImage: string;
  heroImageAlt: string;
  coverImage: string;
  disciplines: string[];
  materialsUsed?: string[];
  brief?: string;
  research?: string;
  inspiration?: string;
  materials?: string;
  experimentation?: string;
  development?: string;
  construction?: string;
  finalResult?: string;
  reflection?: string;
  stages?: {
    id: string;
    number: string;
    name: string;
    description: string;
    images?: { src: string; alt: string; caption?: string }[];
    notes?: string[];
  }[];
  gallery?: { src: string; alt: string; title?: string; type?: 'portrait' | 'detail' | 'landscape' | 'sketch' }[];
  featured: boolean;
  order: number;
  published: boolean;
}

export interface CraftStudy {
  id: string;
  title: string;
  region?: string;
  date: string;
  year: string;
  category: string;
  summary: string;
  technique: string;
  materials: string[];
  processNotes: string[];
  image: string;
  imageAlt: string;
  relatedProjectSlug?: string;
  relatedProjectName?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  date: string;
  year: string;
  type: 'Apprenticeship' | 'Fashion Week' | 'Backstage' | 'Collection' | 'Modelling';
  description: string;
  highlights: string[];
  image?: string;
}

export interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  university?: string;
  location: string;
  details?: string[];
}

export interface VisualDiaryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'PORTRAIT' | 'STYLE' | 'MOOD' | 'DETAIL' | 'EDITORIAL' | 'ARCHIVE' | 'PERSONAL';
  roleTag: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  projectRef?: string;
}

export interface SiteSettings {
  name: string;
  discipline: string;
  tagline: string;
  positioningStatement: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  academicInstitute: string;
  academicPeriod: string;
}

export interface PortfolioSpread {
  pageNumber: number;
  pageTitle: string;
  section: string;
  layout: 'cover' | 'statement' | 'project-concept' | 'project-dev' | 'project-final' | 'craft' | 'experience' | 'process' | 'about' | 'closing';
  headline: string;
  subhead?: string;
  bodyText?: string;
  metadata?: { label: string; value: string }[];
  image?: string;
  imageCaption?: string;
  additionalImages?: { src: string; alt: string; caption?: string }[];
}
