import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

type AppRole = "SUPERADMIN" | "RESTAURANT_ADMIN"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string; 
      role: AppRole;
      restaurantId: number | null | undefined; 
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: AppRole;
    restaurantId: number | null; 
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: AppRole;
    restaurantId: number | null;
  }
}