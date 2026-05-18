import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

type Public_route_type = {
  path: string;
  ifAuthenticated: "next" | "redirect";
};

const public_routes: Public_route_type[] = [
  { path: "/", ifAuthenticated: "next" },
  { path: "/login", ifAuthenticated: "redirect" },
  { path: "/register", ifAuthenticated: "redirect" },
  {
    path: "/refresh_auth",
    ifAuthenticated: "next",
  },
];

const redirect_not_authenticated = "/refresh_auth";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const public_route = public_routes.find((route) => route.path === path);
  const auth_token = request.cookies.get("auth_token");

  if (!auth_token && public_route) {
    return NextResponse.next();
  }

  if (!auth_token && !public_route) {
    const redirect_url = request.nextUrl.clone();
    redirect_url.pathname = redirect_not_authenticated;

    redirect_url.searchParams.set("redirect", path);

    return NextResponse.redirect(redirect_url);
  }

  if (auth_token && public_route?.ifAuthenticated === "redirect") {
    const redirect_url = request.nextUrl.clone();
    redirect_url.pathname = "/profile";

    return NextResponse.redirect(redirect_url);
  }

  if (auth_token && !public_route) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
