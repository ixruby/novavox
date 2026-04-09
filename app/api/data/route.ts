import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import { getSiteData, getStoredFile, writeStoredFile } from '@/lib/get-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('novavox-admin-session')?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const stored = await getStoredFile();

    // Snapshot current state as a new revision
    const revision = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      username: session.username,
      data: stored.current,
    };

    await writeStoredFile({
      current: body,
      revisions: [revision, ...stored.revisions].slice(0, 20),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
