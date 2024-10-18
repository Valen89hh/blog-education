import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Role } from './table-type'
import { Database } from './types'
import { isNumber } from '../utils/regex'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let role: Role = "user"

  if(user){
    const {
      data: profile
    } = await supabase
      .from("profiles")
      .select("role")
      .eq('id', user.id)
      .single()

    role = profile?.role ?? "user"
  }

  // Rutas protegidas
  const protectedRoutes = ['/dashboard', '/create-post', '/edit-post']
  const adminRoutes = ['/admin']
  const authRoutes = ["/login", "/register"]

  if(user && 
    authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ){
    // Redirigir al usuario a la página privada
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/posts'
    return NextResponse.redirect(url)
  }

  if (
    !user &&
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    // Redirigir al usuario a la página de login si no está autenticado
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (
    adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && role !== "admin"
  ) {
    // Redirigir al usuario a la página de login si no está autenticado
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Verificar si el post que intenta editar pertenece al usuario
  if (request.nextUrl.pathname.startsWith('/edit-post')) {
    const postId = request.nextUrl.pathname.split('/').pop() ?? ""
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/posts'

    if(!isNumber(postId)) return NextResponse.redirect(url)

    const { data: post } = await supabase
      .from('posts')
      .select("author_id")
      .eq("id", parseInt(postId))
      .maybeSingle()

      if (post?.author_id !== user?.id) {
        // Redirigir si el post no pertenece al usuario
        console.log("No es tu post")
        return NextResponse.redirect(url)
      }


  }



  return supabaseResponse
}