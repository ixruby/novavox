import { NextResponse } from 'next/server';

function isSafeImageUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    const hostname = u.hostname.toLowerCase();
    return (
      u.protocol === 'https:' &&
      (hostname.endsWith('cdninstagram.com') ||
        (hostname.startsWith('instagram.') && hostname.endsWith('fbcdn.net')))
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const remote = url.searchParams.get('url') || '';

  if (!remote || !isSafeImageUrl(remote)) {
    return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
  }

  const res = await fetch(remote, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Referer: 'https://www.instagram.com/',
    },
    cache: 'no-store',
  });

  if (!res.ok || !res.body) {
    return NextResponse.json({ error: `Image fetch failed (${res.status})` }, { status: 502 });
  }

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  return new NextResponse(res.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
    },
  });
}
