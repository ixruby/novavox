import { promises as fs } from 'fs';
import path from 'path';
import { artists, releases, products, tourEvents, journalEntries, portfolioWorks,
  type Artist, type Release, type Product, type TourEvent, type JournalEntry, type PortfolioWork } from './data';
import { defaultSettings, type SiteSettings } from './site-settings';

const DATA_PATH = path.join(process.cwd(), 'site-data.json');
const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USE_GIST = !!(GIST_ID && GITHUB_TOKEN);

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
  return {
    artists: (saved.artists as SiteData['artists']) || defaults.artists,
    releases: (saved.releases as SiteData['releases']) || defaults.releases,
    products: (saved.products as SiteData['products']) || defaults.products,
    tourEvents: (saved.tourEvents as SiteData['tourEvents']) || defaults.tourEvents,
    journalEntries: (saved.journalEntries as SiteData['journalEntries']) || defaults.journalEntries,
    portfolioWorks: (saved.portfolioWorks as SiteData['portfolioWorks']) || defaults.portfolioWorks,
    settings: {
      ...defaultSettings,
      ...(saved.settings as SiteSettings),
      homeSections: { ...defaultSettings.homeSections, ...((saved.settings as SiteSettings)?.homeSections) },
    },
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
