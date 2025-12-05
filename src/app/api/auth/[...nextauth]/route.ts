import NextAuth, { User, Session, AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    return null;
                }

                // B. Verificar la contraseña (Texto Plano - TEMPORAL)
                // 💡 Esta es la parte que resuelve el fallo de autenticación.
                const passwordMatch = credentials.password === user.password;

                // En producción, usa: const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    restaurantId: user.restaurantId,
                };
            },
        }),
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                // Solo se ejecuta al hacer login (primera vez)
                token.role = user.role;
                token.restaurantId = user.restaurantId;
            }
            return token;
        },

        async session({ session, token }: { session: Session, token: JWT }) {

            if (session.user && token) {
                session.user.role = token.role;
                session.user.restaurantId = token.restaurantId;
            }

            if (session.user && token && token.sub) {
                session.user.id = token.sub;
            }

            return session;
        },
    },
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };