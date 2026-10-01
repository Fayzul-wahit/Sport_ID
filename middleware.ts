import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: any) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(de|en|ta|ml)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
