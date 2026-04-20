import { isProduction } from '../config/env.js';

export function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: '/',
  };
}
