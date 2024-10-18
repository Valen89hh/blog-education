import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
   // Si la solicitud tiene queries, omitimos la actualización de sesión
   if (request.nextUrl.searchParams.has('page') || request.nextUrl.searchParams.has('search') || request.nextUrl.searchParams.has('filter')) {
    return NextResponse.next();
  }

  // De lo contrario, continuamos con la actualización de sesión
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}