import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateLogin, changePassword, createSessionToken, verifySessionToken, getUsers, addUser, removeUser, updateUser } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === 'login') {
    const { username, password } = body;
    const { valid, role } = await validateLogin(username, password);
    if (!valid) return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    const token = createSessionToken(username, role);
    const cookieStore = await cookies();
    cookieStore.set('novavox-admin-session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 86400, path: '/' });
    return NextResponse.json({ success: true, username, role });
  }

  if (action === 'change-password') {
    const cookieStore = await cookies();
    const token = cookieStore.get('novavox-admin-session')?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    const { currentPassword, newPassword } = body;
    const changed = await changePassword(currentPassword, newPassword, session.username);
    if (!changed) return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
    return NextResponse.json({ success: true });
  }

  if (action === 'logout') {
    const cookieStore = await cookies();
    cookieStore.delete('novavox-admin-session');
    return NextResponse.json({ success: true });
  }

  // User management (owner/admin only)
  if (action === 'get-users' || action === 'add-user' || action === 'remove-user' || action === 'update-user') {
    const cookieStore = await cookies();
    const token = cookieStore.get('novavox-admin-session')?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session || session.role !== 'owner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    if (action === 'get-users') {
      const users = await getUsers();
      return NextResponse.json({ users });
    }
    if (action === 'add-user') {
      const { username, password, role, allowedTabs } = body;
      const ok = await addUser({ username, password, role, allowedTabs });
      return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'User exists' }, { status: 400 });
    }
    if (action === 'remove-user') {
      const ok = await removeUser(body.username);
      return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (action === 'update-user') {
      const { username, updates } = body;
      const ok = await updateUser(username, updates);
      return ok ? NextResponse.json({ success: true }) : NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('novavox-admin-session')?.value;
  if (!token) return NextResponse.json({ authenticated: false });
  const session = verifySessionToken(token);
  if (!session) return NextResponse.json({ authenticated: false });
  return NextResponse.json({ authenticated: true, username: session.username, role: session.role });
}
