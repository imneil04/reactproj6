import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
    
    const { response, user } = await updateSession(request);

    const pathname = request.nextUrl.pathname;

    // Allow guests to access login page
    if (!user && pathname === "/login") {
        return response;
    }

    // Guests blocked from protected routes
    if (!user) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Create Supabase client
    const supabase = createServerClient(

        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },

                setAll() {},
            },
        }
    );

    // Get user role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

        // STAFF ROUTE PROTECTION
        if (
            pathname.startsWith("/staff") &&
            profile?.role !== "staff"
        ) {
            return NextResponse.redirect(
                new URL("/parent/dashboard", request.url)
            );
        }

        // PARENT ROUTE PROTECTION
        if (
            pathname.startsWith("/parent") &&
            profile?.role !== "parent"
        ) {
            return NextResponse.redirect(
                new URL("/staff/dashboard", request.url)
            );
        }

        if (user && pathname === "/login") {

            if (profile?.role === "staff") {
                return NextResponse.redirect(
                    new URL("/staff/dashboard", request.url)
                );
            }

            return NextResponse.redirect(
                new URL("/parent/dashboard", request.url)
            );
        }

        
    return response;
}

export const config = {
    matcher: ["/staff/:path*", "/parent/:path*", "/login"],
};