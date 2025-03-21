import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified middleware for demonstration purposes
// In a real application, you would use a proper authentication middleware
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the pathname starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // Check if the user is authenticated by looking for the auth token
    const token = request.cookies.get("auth_token")?.value

    // If there is no token, redirect to the login page
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("from", pathname)
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

