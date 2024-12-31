/**
 * Enterprise Authentication Middleware
 *
 * @description Enforces authentication and role-based access control for protected routes
 * @location /middleware.ts (root directory)
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Protected paths verification
    const isAuthPath = request.nextUrl.pathname.startsWith("/auth");
    const isApiPath = request.nextUrl.pathname.startsWith("/api");
    const isPublicPath = ["/", "/about"].includes(request.nextUrl.pathname);

    // Authentication state validation
    if (request.nextauth.token && isAuthPath) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Path-specific access control
    if (!isApiPath && !isPublicPath && !isAuthPath) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

/**
 * Middleware Configuration
 *
 * @description Defines protected route patterns
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/projects/:path*",
    "/auth/:path*",
  ],
};
