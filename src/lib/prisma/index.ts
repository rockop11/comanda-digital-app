import { PrismaClient } from '@/generated/prisma/client' 
import { PrismaPg } from '@prisma/adapter-pg'
// 💡 Necesitas importar el Pool de la librería 'pg'
import { Pool } from 'pg' 


const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

// 1. Usar la URL de Vercel/Neon que definimos en prisma.config.ts y .env.local
const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("❌ Error: No se encontró la cadena de conexión POSTGRES_PRISMA_URL o DATABASE_URL.");
}

// 2. Crear un Pool de Conexiones de pg
const pool = new Pool({ connectionString });

// 3. Pasar el Pool al Adaptador de Prisma
const adapter = new PrismaPg(pool);


const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter, // Aquí usamos el adaptador con el Pool
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma