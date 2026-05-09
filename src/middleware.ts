import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Ambil token masing-masing role
  const adminToken = request.cookies.get('token')?.value;
  const patientToken = request.cookies.get('patient_token')?.value;

  // --- AREA ADMIN ---
  const isAdminRoute = pathname === '/' || pathname.startsWith('/patients');
  const isAdminLoginPage = pathname === '/login';

  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isAdminLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // --- AREA PASIEN (PORTAL) ---
  const isPatientRoute = pathname.startsWith('/portal/dashboard');
  const isPatientLoginPage = pathname === '/portal/login';

  if (isPatientRoute && !patientToken) {
    return NextResponse.redirect(new URL('/portal/login', request.url));
  }
  if (isPatientLoginPage && patientToken) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
