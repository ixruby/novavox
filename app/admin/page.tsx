'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { defaultConfig, type SiteConfig, type Product, type Journey, type GalleryItem, type Track, type Release, type NavItem } from '@/lib/site-config';
import {
  Save, RotateCcw, Eye, EyeOff, Plus, Trash2, GripVertical,
  Home, Box, Layers, Music, Image, User, Share2, ShoppingBag,
  Settings, Globe, Zap, Layout, Type, Navigation, Disc3,
  Monitor, Palette, FileText, ChevronDown, ChevronRight,
  ExternalLink, Check, AlertCircle, Loader2
} from 'lucide-react';

type Tab = 'general' | 'hero' | 'features' | 'manifesto' | 'products' | 'journeys' | 'gallery' | 'artist' | 'tracks' | 'releases' | 'integration' | 'distribution' | 'navigation' | 'footer' | 'player';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'general', label: 'GENERAL', icon: <Settings size={16} /> },
  { id: 'hero', label: 'HERO', icon: <Monitor size={16} /> },
  { id: 'features', label: 'FEATURES', icon: <Layout size={16} /> },
  { id: 'manifesto', label: 'MANIFESTO', icon: <Type size={16} /> },
  { id: 'products', label: 'PRODUCTS', icon: <Box size={16} /> },
  { id: 'journeys', label: 'JOURNEYS', icon: <Music size={16} /> },
  { id: 'gallery', label: 'GALLERY', icon: <Image size={16} /> },
  { id: 'artist', label: 'ARTIST', icon: <User size={16} /> },
  { id: 'tracks', label: 'TRACKS', icon: <Disc3 size={16} /> },
  { id: 'releases', label: 'RELEASES', icon: <Share2 size={16} /> },
  { id: 'integration', label: 'INTEGRATION', icon: <Layers size={16} /> },
  { id: 'distribution', label: 'DISTRIBUTION', icon: <Globe size={16} /> },
  { id: 'navigation', label: 'NAVIGATION', icon: <Navigation size={16} /> },
  { id: 'footer', label: 'FOOTER', icon: <FileText size={16} /> },
  { id: 'player', label: 'PLAYER', icon: <Music size={16} /> },
];

function Input({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono resize-none"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: {
  label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-white' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${value ? 'left-7 bg-black' : 'left-1 bg-white/40'}`} />
      </button>
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <span className="text-xs font-mono tracking-[0.2em] text-white/70 uppercase">{title}</span>
        {open ? <ChevronDown size={14} className="text-white/40" /> : <ChevronRight size={14} className="text-white/40" />}
      </button>
      {open && <div className="p-6 pt-2 space-y-4 border-t border-white/5">{children}</div>}
    </div>
  );
}

function TagsInput({ label, value, onChange }: {
  label: string; value: string[]; onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState('');
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 text-[10px] border border-white/10 px-2 py-1 text-white/60 tracking-widest">
            {tag}
            <button onClick={() => onChange(value.filter((_, j) => j !== i))} className="text-white/30 hover:text-red-400">
              <Trash2 size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              onChange([...value, input.trim()]);
              setInput('');
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/40 font-mono"
        />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(setConfig).catch(() => {});
  }, []);

  const updateConfig = useCallback((updater: (prev: SiteConfig) => SiteConfig) => {
    setConfig(prev => {
      const next = updater(prev);
      setHasChanges(true);
      return next;
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setHasChanges(false);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError('Failed to save');
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setConfig(defaultConfig);
    setHasChanges(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <Section title="Site Identity">
              <Input label="Site Name" value={config.siteName} onChange={(v) => updateConfig(c => ({ ...c, siteName: v }))} />
              <Input label="Tagline" value={config.siteTagline} onChange={(v) => updateConfig(c => ({ ...c, siteTagline: v }))} />
              <Input label="System Version" value={config.systemVersion} onChange={(v) => updateConfig(c => ({ ...c, systemVersion: v }))} />
              <Input label="System Status" value={config.systemStatus} onChange={(v) => updateConfig(c => ({ ...c, systemStatus: v }))} />
            </Section>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <Section title="Hero Content">
              <Input label="System Label" value={config.hero.label} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, label: v } }))} />
              <Input label="Headline (Bold)" value={config.hero.headline} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, headline: v } }))} />
              <Input label="Headline (Faded)" value={config.hero.headlineFaded} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, headlineFaded: v } }))} />
              <Textarea label="Description" value={config.hero.description} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, description: v } }))} />
            </Section>
            <Section title="Call-to-Action Buttons">
              <Input label="Primary Button Text" value={config.hero.ctaPrimary} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, ctaPrimary: v } }))} />
              <Input label="Primary Button Link" value={config.hero.ctaPrimaryLink} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, ctaPrimaryLink: v } }))} />
              <Input label="Secondary Button Text" value={config.hero.ctaSecondary} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, ctaSecondary: v } }))} />
              <Toggle label="Show Decorative Elements" value={config.hero.showDecorativeElements} onChange={(v) => updateConfig(c => ({ ...c, hero: { ...c.hero, showDecorativeElements: v } }))} />
            </Section>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-6">
            {config.features.items.map((item, i) => (
              <Section key={i} title={`Feature ${i + 1}: ${item.title}`}>
                <Input label="Title" value={item.title} onChange={(v) => updateConfig(c => {
                  const items = [...c.features.items];
                  items[i] = { ...items[i], title: v };
                  return { ...c, features: { items } };
                })} />
                <Textarea label="Description" value={item.desc} onChange={(v) => updateConfig(c => {
                  const items = [...c.features.items];
                  items[i] = { ...items[i], desc: v };
                  return { ...c, features: { items } };
                })} />
                <Input label="Icon (lucide name)" value={item.icon} onChange={(v) => updateConfig(c => {
                  const items = [...c.features.items];
                  items[i] = { ...items[i], icon: v };
                  return { ...c, features: { items } };
                })} />
                <Input label="Link" value={item.link} onChange={(v) => updateConfig(c => {
                  const items = [...c.features.items];
                  items[i] = { ...items[i], link: v };
                  return { ...c, features: { items } };
                })} />
                <button
                  onClick={() => updateConfig(c => ({ ...c, features: { items: c.features.items.filter((_, j) => j !== i) } }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> REMOVE FEATURE
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, features: { items: [...c.features.items, { title: 'NEW FEATURE', desc: 'Description here', icon: 'Box', link: '/' }] }
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD FEATURE
            </button>
          </div>
        );

      case 'manifesto':
        return (
          <div className="space-y-6">
            <Section title="Manifesto Section">
              <Input label="Label" value={config.manifesto.label} onChange={(v) => updateConfig(c => ({ ...c, manifesto: { ...c.manifesto, label: v } }))} />
              <Textarea label="Quote" value={config.manifesto.quote} onChange={(v) => updateConfig(c => ({ ...c, manifesto: { ...c.manifesto, quote: v } }))} rows={4} />
              <Input label="Attribution" value={config.manifesto.attribution} onChange={(v) => updateConfig(c => ({ ...c, manifesto: { ...c.manifesto, attribution: v } }))} />
            </Section>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            {config.products.map((product, i) => (
              <Section key={product.id} title={`${product.name} — ${product.price}`}>
                <div className="flex items-center justify-between mb-2">
                  <Toggle label="Visible" value={product.visible} onChange={(v) => updateConfig(c => {
                    const products = [...c.products];
                    products[i] = { ...products[i], visible: v };
                    return { ...c, products };
                  })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ID" value={product.id} onChange={(v) => updateConfig(c => {
                    const products = [...c.products];
                    products[i] = { ...products[i], id: v };
                    return { ...c, products };
                  })} />
                  <Input label="Price" value={product.price} onChange={(v) => updateConfig(c => {
                    const products = [...c.products];
                    products[i] = { ...products[i], price: v };
                    return { ...c, products };
                  })} />
                </div>
                <Input label="Name" value={product.name} onChange={(v) => updateConfig(c => {
                  const products = [...c.products];
                  products[i] = { ...products[i], name: v };
                  return { ...c, products };
                })} />
                <Input label="Category" value={product.category} onChange={(v) => updateConfig(c => {
                  const products = [...c.products];
                  products[i] = { ...products[i], category: v };
                  return { ...c, products };
                })} />
                <Input label="Image URL" value={product.image} onChange={(v) => updateConfig(c => {
                  const products = [...c.products];
                  products[i] = { ...products[i], image: v };
                  return { ...c, products };
                })} />
                <TagsInput label="Specs" value={product.specs} onChange={(v) => updateConfig(c => {
                  const products = [...c.products];
                  products[i] = { ...products[i], specs: v };
                  return { ...c, products };
                })} />
                <button
                  onClick={() => updateConfig(c => ({ ...c, products: c.products.filter((_, j) => j !== i) }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> DELETE PRODUCT
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, products: [...c.products, {
                  id: String(c.products.length + 1).padStart(2, '0'),
                  name: 'NEW_PRODUCT', category: 'CATEGORY', price: '$0',
                  image: 'https://picsum.photos/seed/new/800/800', specs: [], visible: true
                }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD PRODUCT
            </button>
          </div>
        );

      case 'journeys':
        return (
          <div className="space-y-6">
            {config.journeys.map((journey, i) => (
              <Section key={i} title={`${journey.title} — ${journey.duration}`}>
                <Toggle label="Visible" value={journey.visible} onChange={(v) => updateConfig(c => {
                  const journeys = [...c.journeys];
                  journeys[i] = { ...journeys[i], visible: v };
                  return { ...c, journeys };
                })} />
                <Input label="Title" value={journey.title} onChange={(v) => updateConfig(c => {
                  const journeys = [...c.journeys];
                  journeys[i] = { ...journeys[i], title: v };
                  return { ...c, journeys };
                })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Duration" value={journey.duration} onChange={(v) => updateConfig(c => {
                    const journeys = [...c.journeys];
                    journeys[i] = { ...journeys[i], duration: v };
                    return { ...c, journeys };
                  })} />
                  <Input label="Category" value={journey.category} onChange={(v) => updateConfig(c => {
                    const journeys = [...c.journeys];
                    journeys[i] = { ...journeys[i], category: v };
                    return { ...c, journeys };
                  })} />
                </div>
                <Input label="Image URL" value={journey.image} onChange={(v) => updateConfig(c => {
                  const journeys = [...c.journeys];
                  journeys[i] = { ...journeys[i], image: v };
                  return { ...c, journeys };
                })} />
                <Textarea label="Description" value={journey.desc} onChange={(v) => updateConfig(c => {
                  const journeys = [...c.journeys];
                  journeys[i] = { ...journeys[i], desc: v };
                  return { ...c, journeys };
                })} />
                <button
                  onClick={() => updateConfig(c => ({ ...c, journeys: c.journeys.filter((_, j) => j !== i) }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> DELETE JOURNEY
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, journeys: [...c.journeys, {
                  title: 'NEW JOURNEY', duration: '00:00', category: 'CATEGORY',
                  image: 'https://picsum.photos/seed/newj/1200/600', desc: 'Description here', visible: true
                }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD JOURNEY
            </button>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-6">
            {config.galleryItems.map((item, i) => (
              <Section key={item.id} title={`${item.title} — ${item.category}`}>
                <Toggle label="Visible" value={item.visible} onChange={(v) => updateConfig(c => {
                  const galleryItems = [...c.galleryItems];
                  galleryItems[i] = { ...galleryItems[i], visible: v };
                  return { ...c, galleryItems };
                })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Title" value={item.title} onChange={(v) => updateConfig(c => {
                    const galleryItems = [...c.galleryItems];
                    galleryItems[i] = { ...galleryItems[i], title: v };
                    return { ...c, galleryItems };
                  })} />
                  <Input label="Category" value={item.category} onChange={(v) => updateConfig(c => {
                    const galleryItems = [...c.galleryItems];
                    galleryItems[i] = { ...galleryItems[i], category: v };
                    return { ...c, galleryItems };
                  })} />
                </div>
                <Input label="Image URL" value={item.image} onChange={(v) => updateConfig(c => {
                  const galleryItems = [...c.galleryItems];
                  galleryItems[i] = { ...galleryItems[i], image: v };
                  return { ...c, galleryItems };
                })} />
                <Input label="Grid Span (e.g. col-span-2 row-span-2)" value={item.span} onChange={(v) => updateConfig(c => {
                  const galleryItems = [...c.galleryItems];
                  galleryItems[i] = { ...galleryItems[i], span: v };
                  return { ...c, galleryItems };
                })} />
                <button
                  onClick={() => updateConfig(c => ({ ...c, galleryItems: c.galleryItems.filter((_, j) => j !== i) }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> DELETE ITEM
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, galleryItems: [...c.galleryItems, {
                  id: c.galleryItems.length + 1, title: 'NEW_ITEM', category: 'CATEGORY',
                  image: 'https://picsum.photos/seed/newg/800/800', span: 'col-span-1 row-span-1', visible: true
                }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD GALLERY ITEM
            </button>
          </div>
        );

      case 'artist':
        return (
          <div className="space-y-6">
            <Section title="Artist Identity">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name (Bold)" value={config.artist.name} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, name: v } }))} />
                <Input label="Name (Faded)" value={config.artist.nameFaded} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, nameFaded: v } }))} />
              </div>
              <Input label="Verified Label" value={config.artist.label} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, label: v } }))} />
              <Input label="Monthly Listeners" value={config.artist.monthlyListeners} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, monthlyListeners: v } }))} />
              <Input label="Hero Image URL" value={config.artist.heroImage} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, heroImage: v } }))} />
            </Section>
            <Section title="Biography">
              <Textarea label="Biography Text" value={config.artist.biography} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, biography: v } }))} rows={5} />
              <TagsInput label="Genre Tags" value={config.artist.tags} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, tags: v } }))} />
              <TagsInput label="Equipment" value={config.artist.equipment} onChange={(v) => updateConfig(c => ({ ...c, artist: { ...c.artist, equipment: v } }))} />
            </Section>
          </div>
        );

      case 'tracks':
        return (
          <div className="space-y-6">
            {config.tracks.map((track, i) => (
              <Section key={track.id} title={`${track.id}. ${track.title}`}>
                <Toggle label="Visible" value={track.visible} onChange={(v) => updateConfig(c => {
                  const tracks = [...c.tracks];
                  tracks[i] = { ...tracks[i], visible: v };
                  return { ...c, tracks };
                })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ID" value={track.id} onChange={(v) => updateConfig(c => {
                    const tracks = [...c.tracks];
                    tracks[i] = { ...tracks[i], id: v };
                    return { ...c, tracks };
                  })} />
                  <Input label="Title" value={track.title} onChange={(v) => updateConfig(c => {
                    const tracks = [...c.tracks];
                    tracks[i] = { ...tracks[i], title: v };
                    return { ...c, tracks };
                  })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Duration" value={track.duration} onChange={(v) => updateConfig(c => {
                    const tracks = [...c.tracks];
                    tracks[i] = { ...tracks[i], duration: v };
                    return { ...c, tracks };
                  })} />
                  <Input label="Play Count" value={track.plays} onChange={(v) => updateConfig(c => {
                    const tracks = [...c.tracks];
                    tracks[i] = { ...tracks[i], plays: v };
                    return { ...c, tracks };
                  })} />
                </div>
                <button
                  onClick={() => updateConfig(c => ({ ...c, tracks: c.tracks.filter((_, j) => j !== i) }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> DELETE TRACK
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, tracks: [...c.tracks, {
                  id: String(c.tracks.length + 1).padStart(2, '0'),
                  title: 'NEW_TRACK', duration: '00:00', plays: '0', visible: true
                }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD TRACK
            </button>
          </div>
        );

      case 'releases':
        return (
          <div className="space-y-6">
            {config.releases.map((release, i) => (
              <Section key={release.id} title={`${release.title} — ${release.date}`}>
                <Toggle label="Visible" value={release.visible} onChange={(v) => updateConfig(c => {
                  const releases = [...c.releases];
                  releases[i] = { ...releases[i], visible: v };
                  return { ...c, releases };
                })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Title" value={release.title} onChange={(v) => updateConfig(c => {
                    const releases = [...c.releases];
                    releases[i] = { ...releases[i], title: v };
                    return { ...c, releases };
                  })} />
                  <Input label="Artist" value={release.artist} onChange={(v) => updateConfig(c => {
                    const releases = [...c.releases];
                    releases[i] = { ...releases[i], artist: v };
                    return { ...c, releases };
                  })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Date" value={release.date} onChange={(v) => updateConfig(c => {
                    const releases = [...c.releases];
                    releases[i] = { ...releases[i], date: v };
                    return { ...c, releases };
                  })} />
                  <Input label="Image URL" value={release.image} onChange={(v) => updateConfig(c => {
                    const releases = [...c.releases];
                    releases[i] = { ...releases[i], image: v };
                    return { ...c, releases };
                  })} />
                </div>
                <button
                  onClick={() => updateConfig(c => ({ ...c, releases: c.releases.filter((_, j) => j !== i) }))}
                  className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[10px] font-mono tracking-widest transition-colors"
                >
                  <Trash2 size={12} /> DELETE RELEASE
                </button>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, releases: [...c.releases, {
                  id: String(c.releases.length + 1).padStart(2, '0'),
                  title: 'NEW_RELEASE', artist: 'ARTIST', date: '2024.01.01',
                  image: 'https://picsum.photos/seed/newrel/800/800', visible: true
                }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD RELEASE
            </button>
          </div>
        );

      case 'integration':
        return (
          <div className="space-y-6">
            <Section title="Page Header">
              <Input label="Label" value={config.integration.label} onChange={(v) => updateConfig(c => ({ ...c, integration: { ...c.integration, label: v } }))} />
              <Input label="Headline" value={config.integration.headline} onChange={(v) => updateConfig(c => ({ ...c, integration: { ...c.integration, headline: v } }))} />
              <Textarea label="Description" value={config.integration.description} onChange={(v) => updateConfig(c => ({ ...c, integration: { ...c.integration, description: v } }))} />
            </Section>
            <Section title="Features">
              {config.integration.features.map((f, i) => (
                <div key={i} className="space-y-3 pb-4 mb-4 border-b border-white/5">
                  <Input label={`Feature ${i + 1} Title`} value={f.title} onChange={(v) => updateConfig(c => {
                    const features = [...c.integration.features];
                    features[i] = { ...features[i], title: v };
                    return { ...c, integration: { ...c.integration, features } };
                  })} />
                  <Textarea label="Description" value={f.desc} onChange={(v) => updateConfig(c => {
                    const features = [...c.integration.features];
                    features[i] = { ...features[i], desc: v };
                    return { ...c, integration: { ...c.integration, features } };
                  })} />
                </div>
              ))}
            </Section>
            <Section title="Stats">
              {config.integration.stats.map((s, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <Input label="Label" value={s.label} onChange={(v) => updateConfig(c => {
                    const stats = [...c.integration.stats];
                    stats[i] = { ...stats[i], label: v };
                    return { ...c, integration: { ...c.integration, stats } };
                  })} />
                  <Input label="Value" value={s.value} onChange={(v) => updateConfig(c => {
                    const stats = [...c.integration.stats];
                    stats[i] = { ...stats[i], value: v };
                    return { ...c, integration: { ...c.integration, stats } };
                  })} />
                </div>
              ))}
            </Section>
          </div>
        );

      case 'distribution':
        return (
          <div className="space-y-6">
            <Section title="Page Header">
              <Input label="Label" value={config.distribution.label} onChange={(v) => updateConfig(c => ({ ...c, distribution: { ...c.distribution, label: v } }))} />
              <Input label="Headline" value={config.distribution.headline} onChange={(v) => updateConfig(c => ({ ...c, distribution: { ...c.distribution, headline: v } }))} />
              <Input label="Headline (Faded)" value={config.distribution.headlineFaded} onChange={(v) => updateConfig(c => ({ ...c, distribution: { ...c.distribution, headlineFaded: v } }))} />
              <Textarea label="Description" value={config.distribution.description} onChange={(v) => updateConfig(c => ({ ...c, distribution: { ...c.distribution, description: v } }))} />
              <Input label="Network Nodes Count" value={config.distribution.networkNodes} onChange={(v) => updateConfig(c => ({ ...c, distribution: { ...c.distribution, networkNodes: v } }))} />
            </Section>
            <Section title="Features">
              {config.distribution.features.map((f, i) => (
                <div key={i} className="space-y-3 pb-4 mb-4 border-b border-white/5">
                  <Input label={`Feature ${i + 1} Title`} value={f.title} onChange={(v) => updateConfig(c => {
                    const features = [...c.distribution.features];
                    features[i] = { ...features[i], title: v };
                    return { ...c, distribution: { ...c.distribution, features } };
                  })} />
                  <Textarea label="Description" value={f.desc} onChange={(v) => updateConfig(c => {
                    const features = [...c.distribution.features];
                    features[i] = { ...features[i], desc: v };
                    return { ...c, distribution: { ...c.distribution, features } };
                  })} />
                </div>
              ))}
            </Section>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-6">
            {config.navItems.map((item, i) => (
              <Section key={i} title={item.name}>
                <Toggle label="Visible" value={item.visible} onChange={(v) => updateConfig(c => {
                  const navItems = [...c.navItems];
                  navItems[i] = { ...navItems[i], visible: v };
                  return { ...c, navItems };
                })} />
                <div className="grid grid-cols-3 gap-4">
                  <Input label="Name" value={item.name} onChange={(v) => updateConfig(c => {
                    const navItems = [...c.navItems];
                    navItems[i] = { ...navItems[i], name: v };
                    return { ...c, navItems };
                  })} />
                  <Input label="Path" value={item.path} onChange={(v) => updateConfig(c => {
                    const navItems = [...c.navItems];
                    navItems[i] = { ...navItems[i], path: v };
                    return { ...c, navItems };
                  })} />
                  <Input label="Icon" value={item.icon} onChange={(v) => updateConfig(c => {
                    const navItems = [...c.navItems];
                    navItems[i] = { ...navItems[i], icon: v };
                    return { ...c, navItems };
                  })} />
                </div>
              </Section>
            ))}
            <button
              onClick={() => updateConfig(c => ({
                ...c, navItems: [...c.navItems, { name: 'NEW PAGE', path: '/new', icon: 'Box', visible: true }]
              }))}
              className="w-full py-4 border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-widest"
            >
              <Plus size={14} /> ADD NAV ITEM
            </button>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <Section title="Footer Content">
              <Textarea label="Brand Description" value={config.footer.brandDescription} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, brandDescription: v } }))} />
              <Input label="Copyright" value={config.footer.copyright} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, copyright: v } }))} />
              <Toggle label="Newsletter Enabled" value={config.footer.newsletterEnabled} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, newsletterEnabled: v } }))} />
            </Section>
            <Section title="Social Links">
              <Input label="Twitter URL" value={config.footer.socialLinks.twitter} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, socialLinks: { ...c.footer.socialLinks, twitter: v } } }))} />
              <Input label="Instagram URL" value={config.footer.socialLinks.instagram} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, socialLinks: { ...c.footer.socialLinks, instagram: v } } }))} />
              <Input label="GitHub URL" value={config.footer.socialLinks.github} onChange={(v) => updateConfig(c => ({ ...c, footer: { ...c.footer, socialLinks: { ...c.footer.socialLinks, github: v } } }))} />
            </Section>
          </div>
        );

      case 'player':
        return (
          <div className="space-y-6">
            <Section title="Player Settings">
              <Toggle label="Player Visible" value={config.player.visible} onChange={(v) => updateConfig(c => ({ ...c, player: { ...c.player, visible: v } }))} />
              <Input label="Current Track Name" value={config.player.currentTrack} onChange={(v) => updateConfig(c => ({ ...c, player: { ...c.player, currentTrack: v } }))} />
              <Input label="Current Artist" value={config.player.currentArtist} onChange={(v) => updateConfig(c => ({ ...c, player: { ...c.player, currentArtist: v } }))} />
            </Section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="text-xl font-bold tracking-tighter">NOVAVOX</div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/40 mt-1">ADMIN DASHBOARD</div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-mono tracking-[0.15em] transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
            <a
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-mono tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ExternalLink size={12} /> VIEW SITE
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-white/50 hover:text-white">
              <Layout size={18} />
            </button>
            <div>
              <h1 className="text-sm font-bold tracking-widest uppercase">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <div className="text-[10px] font-mono text-white/30 tracking-widest mt-0.5">
                {hasChanges ? 'UNSAVED CHANGES' : 'ALL CHANGES SAVED'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-mono tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={12} /> RESET
            </button>
            <button
              onClick={save}
              disabled={saving || !hasChanges}
              className={`flex items-center gap-2 px-6 py-2 text-[10px] font-mono tracking-widest font-bold transition-all ${
                saved
                  ? 'bg-green-500 text-black'
                  : hasChanges
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : saved ? <Check size={12} /> : <Save size={12} />}
              {saving ? 'SAVING...' : saved ? 'SAVED' : 'SAVE'}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-4xl">
          {error && (
            <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 flex items-center gap-3 text-red-400 text-xs font-mono">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          {renderContent()}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
