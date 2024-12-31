// /app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { AuthUser } from "@/types/auth";

const prisma = new PrismaClient();

/**
 * Enterprise authentication configuration with comprehensive session management
 * and role-based access control.
 */
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Heslo", type: "password" },
        },
    async authorize(credentials): Promise<AuthUser | null> {
        try {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("INVALID_CREDENTIALS");
            }

        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
                company: {
                    select: {
                    id: true,
                    isActive: true,
                    },
                },
            },
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        if (!user.isActive) {
            throw new Error("ACCOUNT_DISABLED");
        }

        if (user.company && !user.company.isActive) {
            throw new Error("COMPANY_INACTIVE");
        }

        const isPasswordValid = await compare(
            credentials.password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("INVALID_CREDENTIALS");
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.company?.id,
        };
        } catch (error) {
        console.error("Authentication error:", error);
        return null;
            }
        },
    }),
],
callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
            token.companyId = user.companyId;
        }
    return token;
    },
    async session({ session, token }) {
        return {
            ...session,
            user: {
            ...session.user,
            id: token.id,
            role: token.role,
            companyId: token.companyId,
        },
        };
    },
},
pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    signOut: "/auth/logout",
    },
session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    },
jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
},
    debug: process.env.NODE_ENV === "development",
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };