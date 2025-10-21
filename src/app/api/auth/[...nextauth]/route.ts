import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth API Route Handler
 * 
 * This handles all authentication-related API routes:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/csrf
 * - /api/auth/callback/*
 * - /api/auth/providers
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
