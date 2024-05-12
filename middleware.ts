import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";
import { DEFAULT_LOGIN_REDIECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

export async function middleware(request: NextRequest, response: NextResponse) {

    const token = await getToken({ req: request });
    const { nextUrl } = request;
    const isLoggedIn = !!token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    // if (isAuthRoute || isPublicRoute) {
    //     if (isLoggedIn) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIECT, nextUrl));
    //     }
    //     return;
    // }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/", nextUrl));
    }

    return;

}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};