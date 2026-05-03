import { promises as fs } from 'fs';
import path from 'path';
import { artists, releases, products, tourEvents, journalEntries, portfolioWorks,
  type Artist, type Release, type Product, type TourEvent, type JournalEntry, type PortfolioWork } from './data';
import { defaultSettings, type SiteSettings } from './site-settings';

const DATA_PATH = path.join(process.cwd(), 'site-data.json');
const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USE_GIST = !!(GIST_ID && GITHUB_TOKEN);

const CURRENT_SETTINGS_SCHEMA_VERSION = defaultSettings.schemaVersion;

function migrateSettings(settings: SiteSettings): SiteSettings {
  const schemaVersion = typeof settings.schemaVersion === 'number' ? settings.schemaVersion : 0;
  if (schemaVersion >= CURRENT_SETTINGS_SCHEMA_VERSION) return settings;

  const migrated: SiteSettings = {
    ...settings,
    schemaVersion: CURRENT_SETTINGS_SCHEMA_VERSION,
  };

  // ✅ Requested updates (April 2026)
  // Keep Releases hidden by default (still editable in admin panel).
  migrated.pages = {
    ...migrated.pages,
    releases: { ...migrated.pages.releases, visible: false },
  };

  migrated.navigation = (migrated.navigation || []).map((n) => {
    const href = (n.href || '').toLowerCase();
    const label = (n.label || '').toLowerCase();
    if (href === '/releases' || href.includes('releases') || label.trim() === 'releases') return { ...n, visible: false };
    return n;
  });

  migrated.stats = (migrated.stats || []).map((st) => {
    const label = (st.label || '').toLowerCase().replace(/\s+/g, ' ').trim();
    if (label.includes('active') && label.includes('artist')) return { ...st, label: 'Active Technicians' };
    if (label.includes('world') && label.includes('tour') && label.includes('citie')) {
      return { ...st, label: 'Awards', value: st.value?.includes('+') ? st.value : `${st.value}+` };
    }
    return st;
  });

  migrated.contact = {
    ...migrated.contact,
    phone: '+91 6282 725 324',
    email: 'novavoxofficial@gmail.com',
    buttons: (migrated.contact.buttons || []).map((b) => {
      if ((b.label || '').toLowerCase() === 'submit your work') return { ...b, visible: false };
      return b;
    }),
  };

  migrated.social = {
    ...migrated.social,
    instagram: {
      enabled: migrated.social?.instagram?.enabled ?? true,
      username: (() => {
        const current = (migrated.social?.instagram?.username || '').trim();
        if (!current) return 'novavox.official';
        if (schemaVersion < 3 && current.replaceAll('/', '') === 'novavoxofficial') return 'novavox.official';
        return current;
      })(),
      embedMode: migrated.social?.instagram?.embedMode || 'posts',
      postsLimit: migrated.social?.instagram?.postsLimit || 12,
      widgetEmbedCode: migrated.social?.instagram?.widgetEmbedCode || '',
    },
  };

  return migrated;
}

export type SiteData = {
  artists: (Artist & { visible?: boolean; featured?: boolean })[];
  releases: (Release & { visible?: boolean; featured?: boolean })[];
  products: (Product & { visible?: boolean })[];
  tourEvents: (TourEvent & { visible?: boolean })[];
  journalEntries: (JournalEntry & { visible?: boolean })[];
  portfolioWorks: (PortfolioWork & { visible?: boolean })[];
  settings: SiteSettings;
};

export type RevisionEntry = {
  id: string;
  timestamp: string;
  username: string;
  data: SiteData;
};

export type StoredFile = {
  current: SiteData;
  revisions: RevisionEntry[];
};

const defaults: SiteData = {
  artists: artists.map(a => ({ ...a, visible: true, featured: false })),
  releases: releases.map(r => ({ ...r, visible: true, featured: false })),
  products: products.map(p => ({ ...p, visible: true })),
  tourEvents: tourEvents.map(t => ({ ...t, visible: true })),
  journalEntries: journalEntries.map(j => ({ ...j, visible: true })),
  portfolioWorks: portfolioWorks.map(w => ({ ...w, visible: true })),
  settings: defaultSettings,
};

function parseSiteData(saved: Record<string, unknown>): SiteData {
  const incomingSettings = (saved.settings as Partial<SiteSettings> | undefined) || {};
  const incomingSchemaVersion = typeof incomingSettings.schemaVersion === 'number' ? incomingSettings.schemaVersion : 0;

  const mergedSettings: SiteSettings = migrateSettings({
    ...defaultSettings,
    ...incomingSettings,
    // IMPORTANT: migration decision is based on incoming schemaVersion,
    // not the default settings version.
    schemaVersion: incomingSchemaVersion,
    pages: { ...defaultSettings.pages, ...(incomingSettings.pages as SiteSettings['pages'] | undefined) },
    social: {
      ...defaultSettings.social,
      ...(incomingSettings.social as SiteSettings['social'] | undefined),
      instagram: {
        ...defaultSettings.social.instagram,
        ...(incomingSettings.social?.instagram as SiteSettings['social']['instagram'] | undefined),
      },
    },
    navigation: incomingSettings.navigation || defaultSettings.navigation,
  });

  return {
    artists: (saved.artists as SiteData['artists']) || defaults.artists,
    releases: (saved.releases as SiteData['releases']) || defaults.releases,
    products: (saved.products as SiteData['products']) || defaults.products,
    tourEvents: (saved.tourEvents as SiteData['tourEvents']) || defaults.tourEvents,
    journalEntries: (saved.journalEntries as SiteData['journalEntries']) || defaults.journalEntries,
    portfolioWorks: (saved.portfolioWorks as SiteData['portfolioWorks']) || defaults.portfolioWorks,
    settings: mergedSettings,
  };
}

function parseStored(parsed: Record<string, unknown>): StoredFile {
  if (parsed.current) {
    return {
      current: parseSiteData(parsed.current as Record<string, unknown>),
      revisions: (parsed.revisions as RevisionEntry[]) || [],
    };
  }
  return { current: parseSiteData(parsed), revisions: [] };
}

// ── GitHub Gist storage (used on Vercel) ───────────────────────────────────

async function readFromGist(): Promise<StoredFile> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'novavox' },
    cache: 'no-store',
  });
  if (!res.ok) return { current: defaults, revisions: [] };
  const data = await res.json() as { files: Record<string, { content: string }> };
  const content = data.files['site-data.json']?.content;
  if (!content) return { current: defaults, revisions: [] };
  try {
    return parseStored(JSON.parse(content) as Record<string, unknown>);
  } catch {
    return { current: defaults, revisions: [] };
  }
}

async function writeToGist(file: StoredFile): Promise<void> {
  await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'novavox',
    },
    body: JSON.stringify({
      files: { 'site-data.json': { content: JSON.stringify(file, null, 2) } },
    }),
  });
}

// ── Local filesystem storage (used in dev) ─────────────────────────────────

async function readFromFile(): Promise<StoredFile> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return parseStored(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return { current: defaults, revisions: [] };
  }
}

async function writeToFile(file: StoredFile): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(file, null, 2), 'utf-8');
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function getStoredFile(): Promise<StoredFile> {
  return USE_GIST ? readFromGist() : readFromFile();
}

export async function writeStoredFile(file: StoredFile): Promise<void> {
  if (USE_GIST) {
    await writeToGist(file);
  } else {
    await writeToFile(file);
  }
}

export async function getSiteData(): Promise<SiteData> {
  const stored = await getStoredFile();
  return stored.current;
}
