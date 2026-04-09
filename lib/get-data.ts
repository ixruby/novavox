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

const defaults: SiteData = {
  artists: artists.map(a => ({ ...a, visible: true, featured: false })),
  releases: releases.map(r => ({ ...r, visible: true, featured: false })),
  products: products.map(p => ({ ...p, visible: true })),
  tourEvents: tourEvents.map(t => ({ ...t, visible: true })),
  journalEntries: journalEntries.map(j => ({ ...j, visible: true })),
  portfolioWorks: portfolioWorks.map(w => ({ ...w, visible: true })),
  settings: defaultSettings,
};

export async function getSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    const saved = JSON.parse(raw);
    return {
      artists: saved.artists || defaults.artists,
      releases: saved.releases || defaults.releases,
      products: saved.products || defaults.products,
      tourEvents: saved.tourEvents || defaults.tourEvents,
      journalEntries: saved.journalEntries || defaults.journalEntries,
      portfolioWorks: saved.portfolioWorks || defaults.portfolioWorks,
      settings: { ...defaultSettings, ...saved.settings },
    };
  } catch {
    return defaults;
  }
}
