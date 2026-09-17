/**
 * mkk Studio — Site Content
 * ------------------------------------------------------------
 * All copy/data lives here so the interface can be rebuilt or
 * re-skinned without touching components. Replace freely.
 */

export const site = {
  name: 'mkk Studio',
  tagline: 'Digital craft for ambitious brands.',
  description:
    'mkk Studio is a digital studio building high-end websites, brand systems and interactive experiences.',
  email: 'hello@mkk.studio',
  phone: '+254 700 000 000',
  location: 'Nairobi · Remote worldwide',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'X', href: 'https://x.com' },
  ],
}

export const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  // Rendered word-by-word
  headline: ['Design', 'systems', 'that', 'move.'],
  intro:
    'We are mkk Studio — a creative development practice shaping brands, products and digital experiences with precision.',
  ctaPrimary: { label: 'Start a Project', href: '/contact' },
  ctaSecondary: { label: 'View Work', href: '/work' },
  marquee: [
    'Brand Systems',
    'Web Experiences',
    'Interactive Motion',
    'Creative Development',
    'Art Direction',
    'Design Engineering',
  ],
}

export type Project = {
  id: string
  title: string
  category: string
  year: string
  client: string
  // aspect: controls grid span / image ratio for the editorial layout
  size: 'large' | 'wide' | 'tall' | 'standard'
  accent: string
}

export const projects: Project[] = [
  {
    id: 'atlas',
    title: 'Atlas Financial',
    category: 'Brand & Web',
    year: '2024',
    client: 'Atlas',
    size: 'large',
    accent: '#22D3EE',
  },
  {
    id: 'nova',
    title: 'Nova Robotics',
    category: 'Interactive',
    year: '2024',
    client: 'Nova',
    size: 'standard',
    accent: '#67E8F9',
  },
  {
    id: 'meridian',
    title: 'Meridian Studio',
    category: 'Art Direction',
    year: '2023',
    client: 'Meridian',
    size: 'tall',
    accent: '#06B6D4',
  },
  {
    id: 'songlines',
    title: 'Songlines Festival',
    category: 'Experiential',
    year: '2023',
    client: 'Songlines',
    size: 'wide',
    accent: '#22D3EE',
  },
  {
    id: 'verso',
    title: 'Verso Publishing',
    category: 'Editorial',
    year: '2023',
    client: 'Verso',
    size: 'standard',
    accent: '#67E8F9',
  },
  {
    id: 'orbit',
    title: 'Orbit Commerce',
    category: 'Product',
    year: '2022',
    client: 'Orbit',
    size: 'large',
    accent: '#06B6D4',
  },
]

export const services = [
  {
    id: '01',
    title: 'Brand Systems',
    description:
      'Identity, typography, colour and motion systems built to scale across every surface.',
  },
  {
    id: '02',
    title: 'Web Experiences',
    description:
      'High-performance, editorial websites engineered with precision and intent.',
  },
  {
    id: '03',
    title: 'Interactive Motion',
    description:
      'Scroll-driven storytelling, WebGL and micro-interactions that guide attention.',
  },
  {
    id: '04',
    title: 'Design Engineering',
    description:
      'Production front-end systems that keep craft intact from concept to launch.',
  },
]

export const stats = [
  { value: '60+', label: 'Projects shipped' },
  { value: '08', label: 'Years in practice' },
  { value: '14', label: 'Studio team' },
  { value: '12', label: 'Countries served' },
]

export const about = {
  headline: 'We build brands that behave like software.',
  body: [
    'mkk Studio is a small, senior team of designers and engineers. We work end-to-end — strategy, identity, interface and the code that brings it to life.',
    'We believe craft is a system, not a finish. Every decision is intentional, from the type scale to the easing curve.',
  ],
  values: [
    { title: 'Precision', body: 'Every pixel and every millisecond is considered.' },
    { title: 'Clarity', body: 'We remove noise so the message can lead.' },
    { title: 'Craft', body: 'Motion and detail treated as first-class materials.' },
    { title: 'Partnership', body: 'We work alongside teams, not for them.' },
  ],
}
