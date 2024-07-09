import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        const { nextUrl } = request;
        const isLoggedIn = !!token;

        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
        const isAuthRoute = authRoutes.includes(nextUrl.pathname);

        // Allow API auth routes to proceed without checking login status
        if (isApiAuthRoute) {
            return NextResponse.next();
        }

        // Redirect to login if not logged in and trying to access a protected route
        if (!isLoggedIn && !isPublicRoute) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        // Allow all other requests to proceed
        return NextResponse.next();

    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/((?!.*\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
