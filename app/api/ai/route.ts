import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('novavox-admin-session')?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { prompt, type = 'text' } = await request.json();
  if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
  if (!GEMINI_KEY) return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });

  try {
    const systemCtx = `You are an AI assistant for NOVAVOX — a cinematic film, music, and audio production company founded by Kaushik Jayakumar. NOVAVOX specializes in film production, advertising, post production, music videos, spatial audio, and sound design. Tone: professional, cinematic, minimal, powerful. Always write in UPPERCASE where appropriate for the brand. Keep responses concise and on-brand.`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemCtx }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: type === 'short' ? 100 : 500 },
        }),
      }
    );

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return NextResponse.json({ error: 'No response from Gemini' }, { status: 500 });
    return NextResponse.json({ result: text.trim() });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
