export type Artist = {
  slug: string;
  name: string;
  genre: string;
  image: string;
  coordinates: string;
  status: "ACTIVE" | "ARCHIVED" | "EMERGING";
  bio: string;
  releases: number;
  listeners: string;
};

export type Track = {
  number: string;
  title: string;
  duration: string;
};

export type Release = {
  catalogNumber: string;
  title: string;
  artistSlug: string;
  artist: string;
  format: "PHYSICAL" | "DIGITAL" | "SPATIAL";
  image: string;
  year: number;
  tracks: Track[];
};

export type Product = {
  sku: string;
  name: string;
  price: number;
  currency: string;
  series: string;
  material: string;
  image: string;
  badge?: string;
};

export type TourEvent = {
  date: string;
  city: string;
  country: string;
  venue: string;
  features: string[];
  status: "RESERVE" | "SOLD OUT";
};

export type JournalEntry = {
  slug: string;
  issue: string;
  title: string;
  description: string;
  author: string;
  duration: string;
  image: string;
  type: "ESSAY" | "NOTE" | "INTERVIEW";
};

export const artists: Artist[] = [
  { slug: "aura-vance", name: "AURA VANCE", genre: "SPATIAL AMBIENT", image: "/images/artist-1.jpg", coordinates: "52.5200°N, 13.4050°E", status: "ACTIVE", bio: "Berlin-based spatial audio architect. Pioneering immersive soundscapes that blur the boundary between acoustic phenomena and digital synthesis.", releases: 4, listeners: "2.4M" },
  { slug: "kael-drift", name: "KAEL DRIFT", genre: "INDUSTRIAL TECHNO", image: "/images/artist-2.jpg", coordinates: "35.6762°N, 139.6503°E", status: "ACTIVE", bio: "Tokyo's foremost industrial sound designer. Raw frequencies shaped through architectural acoustics.", releases: 3, listeners: "1.8M" },
  { slug: "nova-echo", name: "NOVA ECHO", genre: "DARK AMBIENT", image: "/images/artist-3.jpg", coordinates: "51.5074°N, 0.1278°W", status: "ACTIVE", bio: "London collective exploring the sonic properties of abandoned industrial spaces.", releases: 6, listeners: "890K" },
  { slug: "void-architect", name: "VOID ARCHITECT", genre: "DRONE SYNTHESIS", image: "/images/artist-4.jpg", coordinates: "48.8566°N, 2.3522°E", status: "ACTIVE", bio: "Parisian composer working at the intersection of brutalist architecture and harmonic resonance.", releases: 2, listeners: "560K" },
  { slug: "steel-meridian", name: "STEEL MERIDIAN", genre: "NOISE SCULPTURE", image: "/images/artist-5.jpg", coordinates: "40.7128°N, 74.0060°W", status: "ACTIVE", bio: "New York sound sculptor. Creating temporal installations using industrial waste frequencies.", releases: 5, listeners: "1.2M" },
  { slug: "cipher-wave", name: "CIPHER WAVE", genre: "ALGORITHMIC BASS", image: "/images/artist-6.jpg", coordinates: "55.7558°N, 37.6173°E", status: "EMERGING", bio: "Moscow-based producer. Generative systems creating unpredictable low-frequency architectures.", releases: 1, listeners: "340K" },
  { slug: "null-frequency", name: "NULL FREQUENCY", genre: "FIELD RECORDING", image: "/images/artist-7.jpg", coordinates: "64.1466°N, 21.9426°W", status: "ACTIVE", bio: "Icelandic field recordist capturing the sonic signatures of volcanic landscapes.", releases: 3, listeners: "720K" },
  { slug: "prism-decay", name: "PRISM DECAY", genre: "GLITCH AMBIENT", image: "/images/artist-8.jpg", coordinates: "52.3676°N, 4.9041°E", status: "ARCHIVED", bio: "Amsterdam-based glitch artist. Deconstructing digital artifacts into meditative compositions.", releases: 7, listeners: "1.5M" },
  { slug: "monolith-sound", name: "MONOLITH SOUND", genre: "CONCRETE MUSIC", image: "/images/artist-9.jpg", coordinates: "59.3293°N, 18.0686°E", status: "ACTIVE", bio: "Stockholm duo. Musique concrète informed by Scandinavian minimalist design principles.", releases: 4, listeners: "430K" },
  { slug: "resonance-lab", name: "RESONANCE LAB", genre: "PSYCHOACOUSTICS", image: "/images/artist-10.jpg", coordinates: "34.0522°N, 118.2437°W", status: "EMERGING", bio: "Los Angeles research collective exploring the psychoacoustic properties of urban environments.", releases: 2, listeners: "280K" },
  { slug: "ferro-static", name: "FERRO STATIC", genre: "ELECTROMAGNETIC", image: "/images/artist-11.jpg", coordinates: "41.9028°N, 12.4964°E", status: "ACTIVE", bio: "Roman artist sonifying electromagnetic fields from ancient ruins and modern infrastructure.", releases: 3, listeners: "670K" },
  { slug: "orbital-silence", name: "ORBITAL SILENCE", genre: "SPACE AMBIENT", image: "/images/artist-12.jpg", coordinates: "28.6139°N, 77.2090°E", status: "ACTIVE", bio: "Delhi-based ambient producer. Translating satellite telemetry data into contemplative soundscapes.", releases: 5, listeners: "950K" },
];

export const releases: Release[] = [
  {
    catalogNumber: "NVX001", title: "CONCRETE RESONANCE", artist: "AURA VANCE", artistSlug: "aura-vance",
    format: "SPATIAL", image: "/images/release-1.jpg", year: 2024,
    tracks: [
      { number: "NV-001", title: "Foundation Layer", duration: "8:42" },
      { number: "NV-002", title: "Steel Harmonic", duration: "6:15" },
      { number: "NV-003", title: "Void Chamber", duration: "11:03" },
      { number: "NV-004", title: "Architectural Decay", duration: "7:58" },
    ],
  },
  {
    catalogNumber: "NVX002", title: "INDUSTRIAL CATHEDRAL", artist: "KAEL DRIFT", artistSlug: "kael-drift",
    format: "PHYSICAL", image: "/images/release-2.jpg", year: 2024,
    tracks: [
      { number: "NV-005", title: "Raw Frequency I", duration: "5:33" },
      { number: "NV-006", title: "Brutalist Mass", duration: "9:12" },
      { number: "NV-007", title: "Tokyo Vault", duration: "7:45" },
    ],
  },
  {
    catalogNumber: "NVX003", title: "ABANDON PROTOCOL", artist: "NOVA ECHO", artistSlug: "nova-echo",
    format: "DIGITAL", image: "/images/release-3.jpg", year: 2024,
    tracks: [
      { number: "NV-008", title: "Hollow Structure", duration: "12:20" },
      { number: "NV-009", title: "Oxidation", duration: "8:55" },
      { number: "NV-010", title: "Silent Load", duration: "6:40" },
      { number: "NV-011", title: "Terminus", duration: "10:15" },
    ],
  },
  {
    catalogNumber: "NVX004", title: "FREQUENCY ATLAS", artist: "VOID ARCHITECT", artistSlug: "void-architect",
    format: "SPATIAL", image: "/images/release-4.jpg", year: 2024,
    tracks: [
      { number: "NV-012", title: "Cartographic Drone", duration: "14:30" },
      { number: "NV-013", title: "Meridian", duration: "9:18" },
    ],
  },
  {
    catalogNumber: "NVX005", title: "TEMPORAL WASTE", artist: "STEEL MERIDIAN", artistSlug: "steel-meridian",
    format: "PHYSICAL", image: "/images/release-5.jpg", year: 2024,
    tracks: [
      { number: "NV-014", title: "Scrap Harmonic", duration: "7:22" },
      { number: "NV-015", title: "Corroded Signal", duration: "8:45" },
      { number: "NV-016", title: "Industrial Residue", duration: "6:10" },
    ],
  },
  {
    catalogNumber: "NVX006", title: "VOLCANIC REGISTER", artist: "NULL FREQUENCY", artistSlug: "null-frequency",
    format: "DIGITAL", image: "/images/release-6.jpg", year: 2024,
    tracks: [
      { number: "NV-017", title: "Magma Core", duration: "15:42" },
      { number: "NV-018", title: "Glacial Drift", duration: "11:05" },
      { number: "NV-019", title: "Basalt Echo", duration: "9:30" },
    ],
  },
  {
    catalogNumber: "NVX007", title: "ARTIFACT GLITCH", artist: "PRISM DECAY", artistSlug: "prism-decay",
    format: "SPATIAL", image: "/images/release-7.jpg", year: 2023,
    tracks: [
      { number: "NV-020", title: "Bitrot Meditation", duration: "8:12" },
      { number: "NV-021", title: "Pixel Monastery", duration: "7:55" },
      { number: "NV-022", title: "Data Vespers", duration: "10:40" },
      { number: "NV-023", title: "Codec Prayer", duration: "6:28" },
    ],
  },
  {
    catalogNumber: "NVX008", title: "SCANDINAVIAN CONCRETE", artist: "MONOLITH SOUND", artistSlug: "monolith-sound",
    format: "PHYSICAL", image: "/images/release-8.jpg", year: 2023,
    tracks: [
      { number: "NV-024", title: "Nordic Mass", duration: "9:15" },
      { number: "NV-025", title: "Pine Resonance", duration: "7:42" },
      { number: "NV-026", title: "Fjord Depth", duration: "12:08" },
    ],
  },
  {
    catalogNumber: "NVX009", title: "GENERATIVE BASS", artist: "CIPHER WAVE", artistSlug: "cipher-wave",
    format: "DIGITAL", image: "/images/release-9.jpg", year: 2024,
    tracks: [
      { number: "NV-027", title: "Algorithm Zero", duration: "6:55" },
      { number: "NV-028", title: "Recursive Pressure", duration: "8:30" },
      { number: "NV-029", title: "Stochastic Drop", duration: "5:48" },
    ],
  },
  {
    catalogNumber: "NVX010", title: "ELECTROMAGNETIC RUINS", artist: "FERRO STATIC", artistSlug: "ferro-static",
    format: "SPATIAL", image: "/images/release-10.jpg", year: 2024,
    tracks: [
      { number: "NV-030", title: "Colosseum Hum", duration: "11:20" },
      { number: "NV-031", title: "Antenna Ghost", duration: "8:45" },
      { number: "NV-032", title: "Wire Choir", duration: "9:10" },
    ],
  },
  {
    catalogNumber: "NVX011", title: "SATELLITE HYMNS", artist: "ORBITAL SILENCE", artistSlug: "orbital-silence",
    format: "DIGITAL", image: "/images/release-11.jpg", year: 2023,
    tracks: [
      { number: "NV-033", title: "Telemetry I", duration: "13:42" },
      { number: "NV-034", title: "Orbital Decay", duration: "10:15" },
      { number: "NV-035", title: "Signal Loss", duration: "8:58" },
    ],
  },
  {
    catalogNumber: "NVX012", title: "URBAN PSYCHE", artist: "RESONANCE LAB", artistSlug: "resonance-lab",
    format: "SPATIAL", image: "/images/release-12.jpg", year: 2024,
    tracks: [
      { number: "NV-036", title: "Highway Drone", duration: "7:30" },
      { number: "NV-037", title: "Concrete Canyon", duration: "9:25" },
      { number: "NV-038", title: "Pedestrian Rhythm", duration: "6:50" },
    ],
  },
];

export const products: Product[] = [
  { sku: "NVX-001", name: "KINETIC MONOLITH", price: 48.00, currency: "EUR", series: "NVX-001", material: "180g Vinyl", image: "/images/product-1.jpg", badge: "Limited Edition" },
  { sku: "NVX-002", name: "VOID RESONANCE", price: 112.00, currency: "EUR", series: "NVX-002", material: "Clear Polymer", image: "/images/product-2.jpg", badge: "Object" },
  { sku: "NVX-ACC", name: "STEEL HOUSING V1", price: 295.00, currency: "EUR", series: "NVX-ACC", material: "Industrial Grade", image: "/images/product-3.jpg" },
  { sku: "NVX-003", name: "RESONANCE CORE", price: 68.00, currency: "EUR", series: "NVX-003", material: "Heavyweight Press", image: "/images/product-4.jpg", badge: "New" },
  { sku: "NVX-004", name: "FREQUENCY PRISM", price: 156.00, currency: "EUR", series: "NVX-004", material: "Crystal Polymer", image: "/images/product-5.jpg", badge: "Object" },
  { sku: "NVX-005", name: "ARCHIVE DECK", price: 420.00, currency: "EUR", series: "NVX-005", material: "Brushed Aluminum", image: "/images/product-6.jpg", badge: "Collector" },
];

export const tourEvents: TourEvent[] = [
  { date: "OCT 14", city: "BERLIN", country: "DE", venue: "Brutalist Cathedral, St. Agnes", features: ["Spatial Audio", "Low Frequency"], status: "RESERVE" },
  { date: "OCT 28", city: "TOKYO", country: "JP", venue: "Industrial Vault, Ota City", features: ["Atmos Matrix", "Zen Acoustic"], status: "SOLD OUT" },
  { date: "NOV 05", city: "LONDON", country: "UK", venue: "Barbican Conservatory", features: ["Bio-Sonic", "Ambisonic"], status: "RESERVE" },
  { date: "NOV 18", city: "NEW YORK", country: "US", venue: "The Tank, Manhattan", features: ["Spatial Array", "Sub-Bass"], status: "RESERVE" },
  { date: "DEC 02", city: "PARIS", country: "FR", venue: "Palais de Tokyo Underground", features: ["Resonance Field", "Ambisonics"], status: "RESERVE" },
  { date: "DEC 14", city: "REYKJAVIK", country: "IS", venue: "Harpa Concert Hall", features: ["Volcanic Frequency", "Field Recording"], status: "SOLD OUT" },
];

export const journalEntries: JournalEntry[] = [
  { slug: "architecture-of-decay", issue: "042", title: "The Architecture of Decay", description: "How entropy shapes the sonic character of Berlin's abandoned industrial spaces. A photographic and acoustic study of controlled deterioration.", author: "Elias Thorne", duration: "14 MIN READ", image: "/images/journal-1.jpg", type: "ESSAY" },
  { slug: "resonance-in-void", issue: "802", title: "Resonance in the Void: The Minimalist Legacy", description: "Tracing the lineage from La Monte Young to contemporary spatial audio practitioners.", author: "Sarah Kovac", duration: "18 MIN READ", image: "/images/journal-2.jpg", type: "NOTE" },
  { slug: "oscillator-drift", issue: "803", title: "Oscillator Drift: Humanizing the Machine", description: "The deliberate introduction of imperfection in modular synthesis.", author: "Marcus Vane", duration: "8 MIN READ", image: "/images/journal-3.jpg", type: "NOTE" },
  { slug: "sculpting-space", issue: "INT-001", title: "Sculpting Space: The Physics of Reverberation", description: "An in-depth conversation with acoustic architect Sarah Kovac on designing spaces for sound.", author: "Sarah Kovac", duration: "48:12", image: "/images/journal-4.jpg", type: "INTERVIEW" },
  { slug: "beyond-24-bit", issue: "INT-002", title: "Beyond 24-Bit: The Quest for Infinite Resolution", description: "Marcus Vane discusses the philosophical implications of digital audio fidelity.", author: "Marcus Vane", duration: "32:05", image: "/images/journal-5.jpg", type: "INTERVIEW" },
];

export const navLinks = [
  { href: "/artists", label: "ARTISTS" },
  { href: "/releases", label: "RELEASES" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/tours", label: "TOURS" },
];
