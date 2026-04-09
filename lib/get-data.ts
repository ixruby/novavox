import { promises as fs } from 'fs';
import path from 'path';
import { artists, releases, products, tourEvents, journalEntries, portfolioWorks,
  type Artist, type Release, type Product, type TourEvent, type JournalEntry, type PortfolioWork } from './data';
import { defaultSettings, type SiteSettings } from './site-settings';

const DATA_PATH = path.join(process.cwd(), 'site-data.json');

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
    settings: { ...defaultSettings, ...(saved.settings as SiteSettings) },
  };
}

export async function getStoredFile(): Promise<StoredFile> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed.current) {
      return {
        current: parseSiteData(parsed.current as Record<string, unknown>),
        revisions: (parsed.revisions as RevisionEntry[]) || [],
      };
    }
    // Legacy flat format — migrate transparently
    return { current: parseSiteData(parsed), revisions: [] };
  } catch {
    return { current: defaults, revisions: [] };
  }
}

export async function writeStoredFile(file: StoredFile): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(file, null, 2), 'utf-8');
}

export async function getSiteData(): Promise<SiteData> {
  const stored = await getStoredFile();
  return stored.current;
}
