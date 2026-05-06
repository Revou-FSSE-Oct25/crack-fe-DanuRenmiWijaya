import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Ambil token dari cookie
  const token = request.cookies.get('token')?.value;

  // 2. Tentukan halaman mana saja yang butuh login (proteksi)
  const isProtectedRoute = 
    request.nextUrl.pathname === '/' || 
    request.nextUrl.pathname.startsWith('/dashboard');

  // 3. Tentukan halaman login
  const isLoginPage = request.nextUrl.pathname === '/login';

  // LOGIKA PROTEKSI:
  // Jika mencoba akses halaman dashboard tapi TIDAK punya token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah punya token tapi mencoba akses halaman login lagi
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware tidak berjalan di file statis (gambar, dll)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
