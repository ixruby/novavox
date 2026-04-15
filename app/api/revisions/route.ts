import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import { getStoredFile, writeStoredFile } from '@/lib/get-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('novavox-admin-session')?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session || (session.role !== 'owner' && session.role !== 'admin')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const stored = await getStoredFile();
  // Return list without full data (bandwidth saving)
  const list = stored.revisions.map(({ id, timestamp, username }) => ({ id, timestamp, username }));
  return NextResponse.json({ revisions: list });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('novavox-admin-session')?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session || (session.role !== 'owner' && session.role !== 'admin')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await request.json();
  const stored = await getStoredFile();
  const target = stored.revisions.find(r => r.id === id);
  if (!target) return NextResponse.json({ error: 'Revision not found' }, { status: 404 });

  // Snapshot current state before restoring (so restore itself is reversible)
  const snapshot = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    username: session.username,
    data: stored.current,
  };

  await writeStoredFile({
    current: target.data,
    revisions: [snapshot, ...stored.revisions].slice(0, 20),
  });

  return NextResponse.json({ success: true });
}
