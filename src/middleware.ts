import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

interface CustomToken {
    role?: 'SUPERADMIN' | 'RESTAURANT_ADMIN';
}

export default withAuth(
    function middleware(req: NextRequestWithAuth) {

        const token = req.nextauth.token as CustomToken | null;
        const path = req.nextUrl.pathname;

        // 3. Verificación de Rol (Acceso a /admin)
        if (path.startsWith("/admin") && token?.role !== 'SUPERADMIN') {
            return NextResponse.json(
                { message: 'No tienes permiso de Super Administrador.' },
                { status: 403 }
            );
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        }
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/restaurantes/crear",
    ],
};