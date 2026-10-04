import crypto from 'node:crypto';

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(key, 'hex'));
}

export function randomToken() { return crypto.randomBytes(32).toString('base64url'); }
export function sha256(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
export function addDays(days) { return new Date(Date.now() + days * 86400000).toISOString(); }
