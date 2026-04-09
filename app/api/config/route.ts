import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultConfig, type SiteConfig } from '@/lib/site-config';

const CONFIG_PATH = path.join(process.cwd(), 'site-config.json');

async function getConfig(): Promise<SiteConfig> {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    return { ...defaultConfig, ...JSON.parse(data) };
  } catch {
    return defaultConfig;
  }
}

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await fs.writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
