export type SiteSettings = {
  schemaVersion: number;
  hero: { tagline: string; categories: string[] };
  stats: { value: string; label: string }[];
  social: {
    instagram: {
      enabled: boolean;
      username: string;
      embedMode: 'posts' | 'profile' | 'widget';
      postsLimit: number;
      widgetEmbedCode: string;
    };
  };
  services: { icon: string; tag: string; title: string; description: string; visible: boolean }[];
  about: {
    intro: string;
    story: string;
    stats: { value: string; label: string }[];
    team: string;
    vision: string;
    capabilities: string[];
  };
  contact: {
    headline: string;
    description: string;
    phone: string;
    email: string;
    whatsapp: string;
    buttons: { label: string; href: string; visible: boolean }[];
  };
  navigation: { label: string; href: string; visible: boolean }[];
  pages: Record<string, { visible: boolean; title: string; description: string }>;
  footer: {
    tagline: string;
    copyright: string;
    credit: string;
    creditLink: string;
  };
  seo: { title: string; description: string };
};

export type UserRole = 'owner' | 'admin' | 'client';

export type AdminUser = {
  username: string;
  password: string;
  role: UserRole;
  allowedTabs?: string[];
};

export const defaultSettings: SiteSettings = {
  schemaVersion: 5,
  hero: {
    tagline: "Where Ideas Become Cinematic Realities",
    categories: ["FILM", "ADVERTISING", "POST PRODUCTION", "MUSIC"],
  },
  stats: [
    { value: "100+", label: "Projects Delivered" },
    { value: "15+", label: "Languages" },
    { value: "12", label: "Active Technicians" },
    { value: "6+", label: "Awards" },
  ],
  social: {
    instagram: {
      enabled: true,
      username: "novavox.official",
      embedMode: 'posts',
      postsLimit: 12,
      widgetEmbedCode: '',
    },
  },
  services: [
    { icon: "campaign", tag: "001", title: "Advertising & Commercials", description: "Visually captivating ads with strong brand connection — crafted for digital, television, and corporate campaigns. From storyboards to final output.", visible: true },
    { icon: "movie", tag: "002", title: "Film & Video Production", description: "Cinematic storytelling from concept to completion — including scripting, direction, cinematography, editing, and DI. Feature films, short films, branded content.", visible: true },
    { icon: "tune", tag: "003", title: "Post Production", description: "Premium post workflows that elevate your visuals and sound. DI, re-recording mix, spatial audio, and audio restoration.", visible: true },
    { icon: "music_note", tag: "004", title: "Music Videos & Audio", description: "High-end production for artists who want their sound to look as good as it feels. Concept creation, shooting, editing, DI, and sound mastering.", visible: true },
  ],
  about: {
    intro: "We're not just a team — we're a collective built on trust, freedom, and creativity focused on Quality.",
    story: "Novavox was founded by Kaushik Jayakumar, an accomplished audio engineer and music producer who has worked on over 100+ international and Indian projects across 15+ languages. Our crew includes IMDB-rated Writers, Directors, Editors and DOPs, with a shared vision of delivering cinematic excellence at standard prices.",
    stats: [
      { value: "2025", label: "Founded" },
      { value: "12+", label: "Team Size" },
      { value: "15+", label: "Languages" },
      { value: "100+", label: "Projects" },
    ],
    team: "IMDB-Rated, Award-Winning, and Passion-Driven. Our team consists of Scriptwriters, Directors, DOP, Editors, & Sound engineers who have worked on acclaimed feature films and international projects. Each member brings unique experience from across the industry, combining creativity with precision.",
    vision: "To create a world where every creative mind — artist or technician — can work freely, fearlessly, and with full trust. Novavox stands for quality, creative freedom, and unity in craftsmanship.",
    capabilities: ["SCRIPTING", "DIRECTION", "CINEMATOGRAPHY", "EDITING", "DI", "SPATIAL AUDIO", "SOUND DESIGN", "MASTERING", "MOTION GRAPHICS", "VFX"],
  },
  contact: {
    headline: "Let's Create Something Cinematic.",
    description: "Whether it's a feature film, music video, commercial, or sonic installation — we bring cinematic excellence to every frame and frequency.",
    phone: "+91 6282 725 324",
    email: "novavoxofficial@gmail.com",
    whatsapp: "916282725324",
    buttons: [
      { label: "Start a Project", href: "mailto:novavoxofficial@gmail.com?subject=Project%20Inquiry", visible: true },
      { label: "WhatsApp Us", href: "https://wa.me/916282725324", visible: true },
      { label: "Submit Your Work", href: "/distribution", visible: false },
    ],
  },
  navigation: [
    { label: "SERVICES", href: "#services", visible: true },
    { label: "PORTFOLIO", href: "#portfolio", visible: false },
    { label: "ARTISTS", href: "/artists", visible: false },
    { label: "RELEASES", href: "/releases", visible: false },
    { label: "TOURS", href: "/tours", visible: false },
    { label: "JOURNAL", href: "/journal", visible: false },
    { label: "SHOP", href: "/shop", visible: false },
  ],
  pages: {
    portfolio: { visible: false, title: "Portfolio — NOVAVOX", description: "Selected work by NOVAVOX." },
    artists: { visible: false, title: "Artists — NOVAVOX", description: "Discover the NOVAVOX artist roster." },
    releases: { visible: false, title: "Releases — NOVAVOX", description: "Full catalog of NOVAVOX releases." },
    tours: { visible: false, title: "Global Circuit — NOVAVOX", description: "NOVAVOX world tour dates." },
    journal: { visible: false, title: "Sonic Journal — NOVAVOX", description: "Essays, notes, and interviews." },
    shop: { visible: false, title: "Archive — NOVAVOX", description: "NOVAVOX merchandise and objects." },
    gallery: { visible: true, title: "Gallery — NOVAVOX", description: "Visual gallery." },
    distribution: { visible: true, title: "Distribution — NOVAVOX", description: "Submit your work." },
    player: { visible: true, title: "Player — NOVAVOX", description: "Spatial audio player." },
    catalog: { visible: true, title: "Catalog — NOVAVOX", description: "Browse the full catalog." },
  },
  footer: {
    tagline: "Where ideas become cinematic realities. Film, music, and sound — crafted with precision.",
    copyright: "NOVAVOX. ALL RIGHTS RESERVED.",
    credit: "9RUBY",
    creditLink: "https://9ruby.com",
  },
  seo: {
    title: "NOVAVOX — Where Ideas Become Cinematic Realities",
    description: "Film & video production, advertising, post production, and music — cinematic excellence by Kaushik Jayakumar and team.",
  },
};

// Role permission definitions
export const rolePermissions: Record<UserRole, { tabs: string[]; canDelete: boolean; canManageUsers: boolean; canEditSettings: boolean }> = {
  owner: { tabs: ['site', 'services', 'about', 'artists', 'releases', 'portfolio', 'tours', 'journal', 'shop', 'pages', 'navigation', 'contact', 'users', 'settings', 'revisions'], canDelete: true, canManageUsers: true, canEditSettings: true },
  admin: { tabs: ['site', 'services', 'about', 'artists', 'releases', 'portfolio', 'tours', 'journal', 'shop', 'pages', 'navigation', 'contact', 'settings', 'revisions'], canDelete: true, canManageUsers: false, canEditSettings: true },
  client: { tabs: ['artists', 'releases', 'portfolio', 'tours', 'journal', 'shop'], canDelete: false, canManageUsers: false, canEditSettings: false },
};
