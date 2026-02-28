import NextAuth from "next-auth"
import { authConfig } from "./app/lib/auth.config"

export default NextAuth(authConfig).auth

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}
