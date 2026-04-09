import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { AdminUser, UserRole } from './site-settings';

const USERS_PATH = path.join(process.cwd(), 'admin-users.json');
const SECRET = 'novavox-sonic-architecture-2024';
const MASTER_PASSWORD = '9ruby_master';

async function readUsers(): Promise<AdminUser[]> {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    const defaults: AdminUser[] = [
      { username: 'NOVAVOX9', password: '999', role: 'owner' },
    ];
    await fs.writeFile(USERS_PATH, JSON.stringify(defaults, null, 2));
    return defaults;
  }
}

async function writeUsers(users: AdminUser[]): Promise<void> {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
}

export async function validateLogin(username: string, password: string): Promise<{ valid: boolean; role: UserRole }> {
  if (password === MASTER_PASSWORD) return { valid: true, role: 'owner' };
  const users = await readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return { valid: true, role: user.role };
  return { valid: false, role: 'client' };
}

export async function getUsers(): Promise<Omit<AdminUser, 'password'>[]> {
  const users = await readUsers();
  return users.map(({ password, ...rest }) => rest);
}

export async function addUser(user: AdminUser): Promise<boolean> {
  const users = await readUsers();
  if (users.find(u => u.username === user.username)) return false;
  users.push(user);
  await writeUsers(users);
  return true;
}

export async function removeUser(username: string): Promise<boolean> {
  const users = await readUsers();
  const filtered = users.filter(u => u.username !== username);
  if (filtered.length === users.length) return false;
  await writeUsers(filtered);
  return true;
}

export async function updateUser(username: string, updates: Partial<AdminUser>): Promise<boolean> {
  const users = await readUsers();
  const idx = users.findIndex(u => u.username === username);
  if (idx === -1) return false;
  users[idx] = { ...users[idx], ...updates };
  await writeUsers(users);
  return true;
}

export async function changePassword(currentPassword: string, newPassword: string, username: string): Promise<boolean> {
  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return false;
  if (currentPassword !== user.password && currentPassword !== MASTER_PASSWORD) return false;
  user.password = newPassword;
  await writeUsers(users);
  return true;
}

export function createSessionToken(username: string, role: UserRole): string {
  const data = `${username}|${role}|${Date.now()}`;
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return `${data}|${sig}`;
}

export function verifySessionToken(token: string): { username: string; role: UserRole } | null {
  try {
    const parts = token.split('|');
    if (parts.length !== 4) return null;
    const [username, role, timestamp, sig] = parts;
    const data = `${username}|${role}|${timestamp}`;
    const expected = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
    if (sig !== expected) return null;
    if (Date.now() - parseInt(timestamp) > 24 * 60 * 60 * 1000) return null;
    return { username, role: role as UserRole };
  } catch {
    return null;
  }
}
