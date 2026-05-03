import { NextResponse } from 'next/server';

type InstagramPost = {
  id: string;
  shortcode: string;
  displayUrl: string;
  thumbnailUrl: string;
  isVideo: boolean;
  caption: string;
  timestamp: number;
};

function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9._]{1,64}$/.test(username);
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const username = (url.searchParams.get('username') || '').trim();
  const limit = clamp(Number(url.searchParams.get('limit') || 12), 1, 24);

  const proxiedImage = (remoteUrl: string) =>
    remoteUrl ? `${origin}/api/instagram/image?url=${encodeURIComponent(remoteUrl)}` : '';

  if (!username || !isValidUsername(username)) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        // Public, unauthenticated web endpoint. This header is commonly required.
        'X-IG-App-ID': '936619743392459',
        Referer: `https://www.instagram.com/${username}/`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Instagram fetch failed (${res.status})` }, { status: 502 });
    }

    const json = (await res.json()) as any;
    const edges: any[] = json?.data?.user?.edge_owner_to_timeline_media?.edges || [];

    const posts: InstagramPost[] = edges
      .map((e) => e?.node)
      .filter(Boolean)
      .slice(0, limit)
      .map((node) => {
        const caption =
          node?.edge_media_to_caption?.edges?.[0]?.node?.text ||
          node?.accessibility_caption ||
          '';
        return {
          id: String(node?.id || ''),
          shortcode: String(node?.shortcode || ''),
          displayUrl: proxiedImage(String(node?.display_url || node?.displayUrl || '')),
          thumbnailUrl: proxiedImage(String(node?.thumbnail_src || node?.thumbnailUrl || node?.display_url || '')),
          isVideo: Boolean(node?.is_video),
          caption: String(caption || ''),
          timestamp: Number(node?.taken_at_timestamp || 0),
        };
      })
      .filter((p) => p.id && p.shortcode && (p.displayUrl || p.thumbnailUrl));

    return NextResponse.json(
      {
        username,
        profileUrl: `https://www.instagram.com/${username}/`,
        posts,
      },
      {
        headers: {
          // Edge cache on Vercel.
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
        },
      },
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

