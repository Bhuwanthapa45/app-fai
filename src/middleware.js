import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken'


export async function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/' || path === '/signup'
  const userId = await getDataFromToken(request);
  

  // If trying to access a protected path without a token, redirect to login
  if (!isPublicPath && !userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // If logged in and trying to access a public path (like login), redirect to dashboard
  if (isPublicPath && userId) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
     '/',              // home
    '/login',
    '/signup',
    '/dashboard/:path*', // protect dashboard and its subroutes
  ],
}