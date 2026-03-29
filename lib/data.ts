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

// Artist images — dark, moody portraits and silhouettes
export const artists: Artist[] = [
  { slug: "aura-vance", name: "AURA VANCE", genre: "SPATIAL AMBIENT", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", coordinates: "52.5200°N, 13.4050°E", status: "ACTIVE", bio: "Berlin-based spatial audio architect. Pioneering immersive soundscapes that blur the boundary between acoustic phenomena and digital synthesis.", releases: 4, listeners: "2.4M" },
  { slug: "kael-drift", name: "KAEL DRIFT", genre: "INDUSTRIAL TECHNO", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", coordinates: "35.6762°N, 139.6503°E", status: "ACTIVE", bio: "Tokyo's foremost industrial sound designer. Raw frequencies shaped through architectural acoustics.", releases: 3, listeners: "1.8M" },
  { slug: "nova-echo", name: "NOVA ECHO", genre: "DARK AMBIENT", image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80", coordinates: "51.5074°N, 0.1278°W", status: "ACTIVE", bio: "London collective exploring the sonic properties of abandoned industrial spaces.", releases: 6, listeners: "890K" },
  { slug: "void-architect", name: "VOID ARCHITECT", genre: "DRONE SYNTHESIS", image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80", coordinates: "48.8566°N, 2.3522°E", status: "ACTIVE", bio: "Parisian composer working at the intersection of brutalist architecture and harmonic resonance.", releases: 2, listeners: "560K" },
  { slug: "steel-meridian", name: "STEEL MERIDIAN", genre: "NOISE SCULPTURE", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", coordinates: "40.7128°N, 74.0060°W", status: "ACTIVE", bio: "New York sound sculptor. Creating temporal installations using industrial waste frequencies.", releases: 5, listeners: "1.2M" },
  { slug: "cipher-wave", name: "CIPHER WAVE", genre: "ALGORITHMIC BASS", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80", coordinates: "55.7558°N, 37.6173°E", status: "EMERGING", bio: "Moscow-based producer. Generative systems creating unpredictable low-frequency architectures.", releases: 1, listeners: "340K" },
  { slug: "null-frequency", name: "NULL FREQUENCY", genre: "FIELD RECORDING", image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=800&q=80", coordinates: "64.1466°N, 21.9426°W", status: "ACTIVE", bio: "Icelandic field recordist capturing the sonic signatures of volcanic landscapes.", releases: 3, listeners: "720K" },
  { slug: "prism-decay", name: "PRISM DECAY", genre: "GLITCH AMBIENT", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", coordinates: "52.3676°N, 4.9041°E", status: "ARCHIVED", bio: "Amsterdam-based glitch artist. Deconstructing digital artifacts into meditative compositions.", releases: 7, listeners: "1.5M" },
  { slug: "monolith-sound", name: "MONOLITH SOUND", genre: "CONCRETE MUSIC", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80", coordinates: "59.3293°N, 18.0686°E", status: "ACTIVE", bio: "Stockholm duo. Musique concrète informed by Scandinavian minimalist design principles.", releases: 4, listeners: "430K" },
  { slug: "resonance-lab", name: "RESONANCE LAB", genre: "PSYCHOACOUSTICS", image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80", coordinates: "34.0522°N, 118.2437°W", status: "EMERGING", bio: "Los Angeles research collective exploring the psychoacoustic properties of urban environments.", releases: 2, listeners: "280K" },
  { slug: "ferro-static", name: "FERRO STATIC", genre: "ELECTROMAGNETIC", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", coordinates: "41.9028°N, 12.4964°E", status: "ACTIVE", bio: "Roman artist sonifying electromagnetic fields from ancient ruins and modern infrastructure.", releases: 3, listeners: "670K" },
  { slug: "orbital-silence", name: "ORBITAL SILENCE", genre: "SPACE AMBIENT", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80", coordinates: "28.6139°N, 77.2090°E", status: "ACTIVE", bio: "Delhi-based ambient producer. Translating satellite telemetry data into contemplative soundscapes.", releases: 5, listeners: "950K" },
];

// Release covers — abstract, architectural, textural imagery
export const releases: Release[] = [
  {
    catalogNumber: "NVX001", title: "CONCRETE RESONANCE", artist: "AURA VANCE", artistSlug: "aura-vance",
    format: "SPATIAL", image: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-001", title: "Foundation Layer", duration: "8:42" },
      { number: "NV-002", title: "Steel Harmonic", duration: "6:15" },
      { number: "NV-003", title: "Void Chamber", duration: "11:03" },
      { number: "NV-004", title: "Architectural Decay", duration: "7:58" },
    ],
  },
  {
    catalogNumber: "NVX002", title: "INDUSTRIAL CATHEDRAL", artist: "KAEL DRIFT", artistSlug: "kael-drift",
    format: "PHYSICAL", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-005", title: "Raw Frequency I", duration: "5:33" },
      { number: "NV-006", title: "Brutalist Mass", duration: "9:12" },
      { number: "NV-007", title: "Tokyo Vault", duration: "7:45" },
    ],
  },
  {
    catalogNumber: "NVX003", title: "ABANDON PROTOCOL", artist: "NOVA ECHO", artistSlug: "nova-echo",
    format: "DIGITAL", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f92?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-008", title: "Hollow Structure", duration: "12:20" },
      { number: "NV-009", title: "Oxidation", duration: "8:55" },
      { number: "NV-010", title: "Silent Load", duration: "6:40" },
      { number: "NV-011", title: "Terminus", duration: "10:15" },
    ],
  },
  {
    catalogNumber: "NVX004", title: "FREQUENCY ATLAS", artist: "VOID ARCHITECT", artistSlug: "void-architect",
    format: "SPATIAL", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-012", title: "Cartographic Drone", duration: "14:30" },
      { number: "NV-013", title: "Meridian", duration: "9:18" },
    ],
  },
  {
    catalogNumber: "NVX005", title: "TEMPORAL WASTE", artist: "STEEL MERIDIAN", artistSlug: "steel-meridian",
    format: "PHYSICAL", image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-014", title: "Scrap Harmonic", duration: "7:22" },
      { number: "NV-015", title: "Corroded Signal", duration: "8:45" },
      { number: "NV-016", title: "Industrial Residue", duration: "6:10" },
    ],
  },
  {
    catalogNumber: "NVX006", title: "VOLCANIC REGISTER", artist: "NULL FREQUENCY", artistSlug: "null-frequency",
    format: "DIGITAL", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-017", title: "Magma Core", duration: "15:42" },
      { number: "NV-018", title: "Glacial Drift", duration: "11:05" },
      { number: "NV-019", title: "Basalt Echo", duration: "9:30" },
    ],
  },
  {
    catalogNumber: "NVX007", title: "ARTIFACT GLITCH", artist: "PRISM DECAY", artistSlug: "prism-decay",
    format: "SPATIAL", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", year: 2023,
    tracks: [
      { number: "NV-020", title: "Bitrot Meditation", duration: "8:12" },
      { number: "NV-021", title: "Pixel Monastery", duration: "7:55" },
      { number: "NV-022", title: "Data Vespers", duration: "10:40" },
      { number: "NV-023", title: "Codec Prayer", duration: "6:28" },
    ],
  },
  {
    catalogNumber: "NVX008", title: "SCANDINAVIAN CONCRETE", artist: "MONOLITH SOUND", artistSlug: "monolith-sound",
    format: "PHYSICAL", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80", year: 2023,
    tracks: [
      { number: "NV-024", title: "Nordic Mass", duration: "9:15" },
      { number: "NV-025", title: "Pine Resonance", duration: "7:42" },
      { number: "NV-026", title: "Fjord Depth", duration: "12:08" },
    ],
  },
  {
    catalogNumber: "NVX009", title: "GENERATIVE BASS", artist: "CIPHER WAVE", artistSlug: "cipher-wave",
    format: "DIGITAL", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-027", title: "Algorithm Zero", duration: "6:55" },
      { number: "NV-028", title: "Recursive Pressure", duration: "8:30" },
      { number: "NV-029", title: "Stochastic Drop", duration: "5:48" },
    ],
  },
  {
    catalogNumber: "NVX010", title: "ELECTROMAGNETIC RUINS", artist: "FERRO STATIC", artistSlug: "ferro-static",
    format: "SPATIAL", image: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-030", title: "Colosseum Hum", duration: "11:20" },
      { number: "NV-031", title: "Antenna Ghost", duration: "8:45" },
      { number: "NV-032", title: "Wire Choir", duration: "9:10" },
    ],
  },
  {
    catalogNumber: "NVX011", title: "SATELLITE HYMNS", artist: "ORBITAL SILENCE", artistSlug: "orbital-silence",
    format: "DIGITAL", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", year: 2023,
    tracks: [
      { number: "NV-033", title: "Telemetry I", duration: "13:42" },
      { number: "NV-034", title: "Orbital Decay", duration: "10:15" },
      { number: "NV-035", title: "Signal Loss", duration: "8:58" },
    ],
  },
  {
    catalogNumber: "NVX012", title: "URBAN PSYCHE", artist: "RESONANCE LAB", artistSlug: "resonance-lab",
    format: "SPATIAL", image: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?w=800&q=80", year: 2024,
    tracks: [
      { number: "NV-036", title: "Highway Drone", duration: "7:30" },
      { number: "NV-037", title: "Concrete Canyon", duration: "9:25" },
      { number: "NV-038", title: "Pedestrian Rhythm", duration: "6:50" },
    ],
  },
];

// Products — vinyl, equipment, objects
export const products: Product[] = [
  { sku: "NVX-001", name: "KINETIC MONOLITH", price: 48.00, currency: "EUR", series: "NVX-001", material: "180g Vinyl", image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&q=80", badge: "Limited Edition" },
  { sku: "NVX-002", name: "VOID RESONANCE", price: 112.00, currency: "EUR", series: "NVX-002", material: "Clear Polymer", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", badge: "Object" },
  { sku: "NVX-ACC", name: "STEEL HOUSING V1", price: 295.00, currency: "EUR", series: "NVX-ACC", material: "Industrial Grade", image: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80" },
  { sku: "NVX-003", name: "RESONANCE CORE", price: 68.00, currency: "EUR", series: "NVX-003", material: "Heavyweight Press", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80", badge: "New" },
  { sku: "NVX-004", name: "FREQUENCY PRISM", price: 156.00, currency: "EUR", series: "NVX-004", material: "Crystal Polymer", image: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=800&q=80", badge: "Object" },
  { sku: "NVX-005", name: "ARCHIVE DECK", price: 420.00, currency: "EUR", series: "NVX-005", material: "Brushed Aluminum", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", badge: "Collector" },
];

export const tourEvents: TourEvent[] = [
  { date: "OCT 14", city: "BERLIN", country: "DE", venue: "Brutalist Cathedral, St. Agnes", features: ["Spatial Audio", "Low Frequency"], status: "RESERVE" },
  { date: "OCT 28", city: "TOKYO", country: "JP", venue: "Industrial Vault, Ota City", features: ["Atmos Matrix", "Zen Acoustic"], status: "SOLD OUT" },
  { date: "NOV 05", city: "LONDON", country: "UK", venue: "Barbican Conservatory", features: ["Bio-Sonic", "Ambisonic"], status: "RESERVE" },
  { date: "NOV 18", city: "NEW YORK", country: "US", venue: "The Tank, Manhattan", features: ["Spatial Array", "Sub-Bass"], status: "RESERVE" },
  { date: "DEC 02", city: "PARIS", country: "FR", venue: "Palais de Tokyo Underground", features: ["Resonance Field", "Ambisonics"], status: "RESERVE" },
  { date: "DEC 14", city: "REYKJAVIK", country: "IS", venue: "Harpa Concert Hall", features: ["Volcanic Frequency", "Field Recording"], status: "SOLD OUT" },
];

// Journal images — brutalist architecture, studios, equipment
export const journalEntries: JournalEntry[] = [
  { slug: "architecture-of-decay", issue: "042", title: "The Architecture of Decay", description: "How entropy shapes the sonic character of Berlin's abandoned industrial spaces. A photographic and acoustic study of controlled deterioration.", author: "Elias Thorne", duration: "14 MIN READ", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", type: "ESSAY" },
  { slug: "resonance-in-void", issue: "802", title: "Resonance in the Void: The Minimalist Legacy", description: "Tracing the lineage from La Monte Young to contemporary spatial audio practitioners.", author: "Sarah Kovac", duration: "18 MIN READ", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", type: "NOTE" },
  { slug: "oscillator-drift", issue: "803", title: "Oscillator Drift: Humanizing the Machine", description: "The deliberate introduction of imperfection in modular synthesis.", author: "Marcus Vane", duration: "8 MIN READ", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80", type: "NOTE" },
  { slug: "sculpting-space", issue: "INT-001", title: "Sculpting Space: The Physics of Reverberation", description: "An in-depth conversation with acoustic architect Sarah Kovac on designing spaces for sound.", author: "Sarah Kovac", duration: "48:12", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80", type: "INTERVIEW" },
  { slug: "beyond-24-bit", issue: "INT-002", title: "Beyond 24-Bit: The Quest for Infinite Resolution", description: "Marcus Vane discusses the philosophical implications of digital audio fidelity.", author: "Marcus Vane", duration: "32:05", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80", type: "INTERVIEW" },
];

export const navLinks = [
  { href: "/artists", label: "ARTISTS" },
  { href: "/releases", label: "RELEASES" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/tours", label: "TOURS" },
];
