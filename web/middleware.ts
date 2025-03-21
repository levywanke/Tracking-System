import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the pathname starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
    })

    // If there is no token, redirect to the login page
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Continue with the request
  return NextResponse.next()
}

export const config = {
  // Matcher for routes that should trigger this middleware
  matcher: ["/dashboard/:path*"],
}

