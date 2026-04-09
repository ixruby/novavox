// Central site configuration — all frontend content is controlled from here
// The admin dashboard reads/writes this via API routes

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  specs: string[];
  visible: boolean;
}

export interface Journey {
  title: string;
  duration: string;
  category: string;
  image: string;
  desc: string;
  visible: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  span: string;
  visible: boolean;
}

export interface Track {
  id: string;
  title: string;
  duration: string;
  plays: string;
  visible: boolean;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  date: string;
  image: string;
  visible: boolean;
}

export interface NavItem {
  name: string;
  path: string;
  icon: string;
  visible: boolean;
}

export interface HeroConfig {
  label: string;
  headline: string;
  headlineFaded: string;
  description: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  showDecorativeElements: boolean;
}

export interface ArtistConfig {
  name: string;
  nameFaded: string;
  label: string;
  monthlyListeners: string;
  biography: string;
  tags: string[];
  equipment: string[];
  heroImage: string;
}

export interface FooterConfig {
  brandDescription: string;
  copyright: string;
  newsletterEnabled: boolean;
  socialLinks: {
    twitter: string;
    instagram: string;
    github: string;
  };
}

export interface PlayerConfig {
  currentTrack: string;
  currentArtist: string;
  visible: boolean;
}

export interface IntegrationConfig {
  label: string;
  headline: string;
  description: string;
  features: { title: string; desc: string; icon: string }[];
  stats: { label: string; value: string }[];
}

export interface DistributionConfig {
  label: string;
  headline: string;
  headlineFaded: string;
  description: string;
  features: { title: string; desc: string; icon: string }[];
  networkNodes: string;
}

export interface ManifestoConfig {
  label: string;
  quote: string;
  attribution: string;
}

export interface FeaturesConfig {
  items: { title: string; desc: string; icon: string; link: string }[];
}

export interface SiteConfig {
  // Global
  siteName: string;
  siteTagline: string;
  systemVersion: string;
  systemStatus: string;

  // Sections
  hero: HeroConfig;
  features: FeaturesConfig;
  manifesto: ManifestoConfig;
  artist: ArtistConfig;
  footer: FooterConfig;
  player: PlayerConfig;
  integration: IntegrationConfig;
  distribution: DistributionConfig;

  // Collections
  products: Product[];
  journeys: Journey[];
  galleryItems: GalleryItem[];
  tracks: Track[];
  releases: Release[];
  navItems: NavItem[];
}

export const defaultConfig: SiteConfig = {
  siteName: 'NOVAVOX',
  siteTagline: 'SONIC ARCHITECTURE',
  systemVersion: 'SYSTEM_VERSION_2.4.1',
  systemStatus: 'CORE ENGINE ONLINE',

  hero: {
    label: 'SYSTEM_INIT_SUCCESSFUL',
    headline: 'THE ARCHITECTURE',
    headlineFaded: 'OF SOUND',
    description: 'NOVAVOX is a sonic research laboratory dedicated to the exploration of spatial sound, architectural acoustics, and the intersection of physical space and digital audio.',
    ctaPrimary: 'EXPLORE OBJECTS',
    ctaPrimaryLink: '/catalog',
    ctaSecondary: 'PLAY REEL',
    showDecorativeElements: true,
  },

  features: {
    items: [
      { title: 'SONIC OBJECTS', desc: 'Physical manifestations of digital soundscapes. Hand-crafted audio hardware.', icon: 'Box', link: '/catalog' },
      { title: 'SPATIAL INTEGRATION', desc: 'Architectural sound systems designed for immersive environments.', icon: 'Layers', link: '/integration' },
      { title: 'NARRATIVE JOURNEY', desc: 'Cinematic audio experiences that redefine the boundaries of storytelling.', icon: 'Music', link: '/narrative' },
    ],
  },

  manifesto: {
    label: 'MANIFESTO_01',
    quote: 'SOUND IS NOT JUST SOMETHING WE HEAR; IT IS A SPACE WE INHABIT. WE DON\'T BUILD SPEAKERS; WE ARCHITECT EXPERIENCES.',
    attribution: '— NOVAVOX DESIGN PRINCIPLES',
  },

  artist: {
    name: 'LYRA',
    nameFaded: 'VOID',
    label: 'VERIFIED_ARTIST_ID_772',
    monthlyListeners: '4.2M MONTHLY LISTENERS',
    biography: 'Lyra Void is a pioneer in the field of sonic architecture. Her work explores the relationship between brutalist structures and frequency-based soundscapes. By utilizing NOVAVOX hardware, she creates immersive environments that challenge the boundaries of physical and digital space.',
    tags: ['MODERNIST', 'BRUTALIST', 'AMBIENT', 'SPATIAL'],
    equipment: ['MONOLITH_X1', 'VOID_RESONATOR', 'NEBULA_ARRAY'],
    heroImage: 'https://picsum.photos/seed/lyra/1920/1080',
  },

  footer: {
    brandDescription: 'International Modernist Sonic Architecture. High contrast, monochrome, sharp edges, cinematic, architectural.',
    copyright: '© 2026 NOVAVOX_LABS. ALL_RIGHTS_RESERVED.',
    newsletterEnabled: true,
    socialLinks: {
      twitter: '#',
      instagram: '#',
      github: '#',
    },
  },

  player: {
    currentTrack: 'SONIC OBJECT 01',
    currentArtist: 'LYRA VOID',
    visible: true,
  },

  integration: {
    label: 'SPATIAL_ARCHITECT_V2.1',
    headline: 'SONIC INTEGRATION',
    description: 'The Spatial Architect is a proprietary software suite designed to map, simulate, and optimize sonic environments in real-time. Integrate NOVAVOX hardware with your physical space for unparalleled acoustic precision.',
    features: [
      { title: 'ACOUSTIC MAPPING', desc: 'Utilize LiDAR and ultrasonic sensors to create a high-fidelity 3D map of your space.', icon: 'Layers' },
      { title: 'REAL-TIME OPTIMIZATION', desc: 'Dynamic frequency adjustment based on room occupancy and environmental noise.', icon: 'Zap' },
      { title: 'MODULAR EXPANSION', desc: 'Seamlessly add new SONIC OBJECTS to your existing architectural network.', icon: 'Settings' },
    ],
    stats: [
      { label: 'LATENCY', value: '< 1.2MS' },
      { label: 'CHANNELS', value: 'UP TO 128' },
      { label: 'PRECISION', value: '0.01MM' },
      { label: 'COMPATIBILITY', value: 'OSX / WIN' },
    ],
  },

  distribution: {
    label: 'DISTRIBUTION_V1.0',
    headline: 'ARCHITECTING THE',
    headlineFaded: 'FUTURE OF SOUND',
    description: 'NOVAVOX provides a decentralized distribution network for sonic architects. Share your spatial audio experiences with a global audience through our high-fidelity infrastructure.',
    features: [
      { title: 'GLOBAL REACH', desc: 'Deploy your sonic objects and narrative journeys to listeners across 120+ countries.', icon: 'Globe' },
      { title: 'LOSSLESS STREAMING', desc: 'Our network supports up to 24-bit/192kHz spatial audio distribution without compromise.', icon: 'Zap' },
      { title: 'SECURE LICENSING', desc: 'Blockchain-backed rights management ensures your architectural soundscapes are protected.', icon: 'ShieldCheck' },
    ],
    networkNodes: '1,242_ACTIVE',
  },

  products: [
    { id: '01', name: 'MONOLITH_X1', category: 'SPATIAL TRANSDUCER', price: '$2,400', image: 'https://picsum.photos/seed/monolith/800/800', specs: ['360° DISPERSION', 'CARBON FIBER CHASSIS', 'HAPTIC FEEDBACK'], visible: true },
    { id: '02', name: 'VOID_RESONATOR', category: 'ACOUSTIC DIFFUSER', price: '$1,850', image: 'https://picsum.photos/seed/resonator/800/800', specs: ['PARAMETRIC DESIGN', 'SOLID ALUMINUM', 'FREQUENCY TUNED'], visible: true },
    { id: '03', name: 'NEBULA_ARRAY', category: 'ATMOSPHERIC SYSTEM', price: '$4,200', image: 'https://picsum.photos/seed/nebula/800/800', specs: ['16-CHANNEL OUTPUT', 'AI CALIBRATION', 'MODULAR DESIGN'], visible: true },
    { id: '04', name: 'PULSE_MODULE', category: 'KINETIC AUDIO', price: '$950', image: 'https://picsum.photos/seed/pulse/800/800', specs: ['VIBRATION ISOLATION', 'OLED DISPLAY', 'WIRELESS SYNC'], visible: true },
  ],

  journeys: [
    { title: 'THE BRUTALIST ECHO', duration: '45:00', category: 'ARCHITECTURAL SONICS', image: 'https://picsum.photos/seed/brutalist/1200/600', desc: 'An immersive journey through the concrete corridors of modernist architecture. Frequency-tuned for spatial depth.', visible: true },
    { title: 'VOID RESONANCE', duration: '32:15', category: 'MINIMALIST AMBIENT', image: 'https://picsum.photos/seed/void/1200/600', desc: 'A deep exploration of silence and the space between sounds. Designed for the VOID_RESONATOR hardware.', visible: true },
    { title: 'KINETIC PULSE', duration: '58:40', category: 'RHYTHMIC ARCHITECTURE', image: 'https://picsum.photos/seed/kinetic/1200/600', desc: 'Dynamic rhythmic structures that respond to your movement through space. Best experienced with NEBULA_ARRAY.', visible: true },
  ],

  galleryItems: [
    { id: 1, title: 'BRUTALIST_01', category: 'ARCHITECTURE', image: 'https://picsum.photos/seed/brut1/800/800', span: 'col-span-2 row-span-2', visible: true },
    { id: 2, title: 'SONIC_WAVE', category: 'VISUALIZER', image: 'https://picsum.photos/seed/wave1/800/800', span: 'col-span-1 row-span-1', visible: true },
    { id: 3, title: 'VOID_SPACE', category: 'INSTALLATION', image: 'https://picsum.photos/seed/void1/800/800', span: 'col-span-1 row-span-2', visible: true },
    { id: 4, title: 'MONOLITH_DETAIL', category: 'HARDWARE', image: 'https://picsum.photos/seed/mono1/800/800', span: 'col-span-1 row-span-1', visible: true },
    { id: 5, title: 'NEBULA_CORE', category: 'SYSTEM', image: 'https://picsum.photos/seed/neb1/800/800', span: 'col-span-2 row-span-1', visible: true },
    { id: 6, title: 'PULSE_KINETIC', category: 'MOTION', image: 'https://picsum.photos/seed/pulse1/800/800', span: 'col-span-1 row-span-1', visible: true },
  ],

  tracks: [
    { id: '01', title: 'BRUTALIST_ECHO', duration: '04:12', plays: '1.2M', visible: true },
    { id: '02', title: 'VOID_RESONANCE', duration: '03:45', plays: '850K', visible: true },
    { id: '03', title: 'KINETIC_PULSE', duration: '05:20', plays: '2.1M', visible: true },
    { id: '04', title: 'NEBULA_CORE', duration: '04:58', plays: '1.5M', visible: true },
    { id: '05', title: 'PULSE_KINETIC', duration: '03:12', plays: '920K', visible: true },
  ],

  releases: [
    { id: '01', title: 'BRUTALIST_ECHO', artist: 'LYRA VOID', date: '2024.03.15', image: 'https://picsum.photos/seed/rel1/800/800', visible: true },
    { id: '02', title: 'VOID_RESONANCE', artist: 'LYRA VOID', date: '2024.02.28', image: 'https://picsum.photos/seed/rel2/800/800', visible: true },
    { id: '03', title: 'KINETIC_PULSE', artist: 'LYRA VOID', date: '2024.01.10', image: 'https://picsum.photos/seed/rel3/800/800', visible: true },
    { id: '04', title: 'NEBULA_CORE', artist: 'LYRA VOID', date: '2023.12.05', image: 'https://picsum.photos/seed/rel4/800/800', visible: true },
    { id: '05', title: 'PULSE_KINETIC', artist: 'LYRA VOID', date: '2023.11.20', image: 'https://picsum.photos/seed/rel5/800/800', visible: true },
    { id: '06', title: 'SONIC_WAVE', artist: 'LYRA VOID', date: '2023.10.15', image: 'https://picsum.photos/seed/rel6/800/800', visible: true },
    { id: '07', title: 'VOID_SPACE', artist: 'LYRA VOID', date: '2023.09.28', image: 'https://picsum.photos/seed/rel7/800/800', visible: true },
    { id: '08', title: 'MONOLITH_DETAIL', artist: 'LYRA VOID', date: '2023.08.10', image: 'https://picsum.photos/seed/rel8/800/800', visible: true },
  ],

  navItems: [
    { name: 'HOME', path: '/', icon: 'Home', visible: true },
    { name: 'CATALOG', path: '/catalog', icon: 'Box', visible: true },
    { name: 'INTEGRATION', path: '/integration', icon: 'Layers', visible: true },
    { name: 'NARRATIVE', path: '/narrative', icon: 'Music', visible: true },
    { name: 'GALLERY', path: '/gallery', icon: 'Grid', visible: true },
    { name: 'ARTIST', path: '/artist', icon: 'User', visible: true },
    { name: 'RELEASES', path: '/releases', icon: 'Share2', visible: true },
    { name: 'CHECKOUT', path: '/checkout', icon: 'ShoppingBag', visible: true },
  ],
};
