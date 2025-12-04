// prisma/seed.ts

// Asegúrate de que esta ruta sea correcta para tu proyecto
import prisma from '@/lib/prisma'; 

async function main() {
  console.log('--- Iniciando Seeding (Borrar y Crear) ---');
  
  // 1. LIMPIEZA: BORRADO EN ORDEN INVERSO (Hijos antes que Padres)
  
  // A. Borrar los 'nietos' (Platos)
  await prisma.dish.deleteMany(); 
  
  // B. Borrar los 'hijos' (Categorías, Usuarios)
  await prisma.menuCategory.deleteMany(); 
  await prisma.user.deleteMany(); 
  
  // C. Borrar los 'padres' (Restaurant y Wifi)
  await prisma.restaurant.deleteMany();
  await prisma.wifi.deleteMany();
  
  console.log('✅ Datos antiguos eliminados con éxito.');

  // 2. INSERCIÓN: CREAR EL RESTAURANTE CON RELACIONES ANIDADAS
  const newRestaurant = await prisma.restaurant.create({
      data: {
          slug: "parrilla-don-julio",
          name: "Parrilla Don Julio",
          image: "/images/don-julio/don-julio-logo.png",

          // Creación anidada de WIFI (Relación 1:1)
          wifi: {
              create: {
                  name: "Wifi Don Julio",
                  password: "DonJulio123",
              },
          },

          // Creación anidada del Usuario Administrador (Relación 1:N)
          users: {
              create: {
                  name: "Admin Don Julio",
                  email: "admin@donjulio.com",
                  // ⚠️ ¡IMPORTANTE: Usar librería bcrypt para hashear esto en producción!
                  password: "SuperSecretPassword123" 
              }
          },

          // Creación anidada de Categorías y Platos
          menuCategories: {
              create: [
                  { // Categoría: Entradas
                      category: "Entradas",
                      dishes: {
                          create: [
                              { name: "Provoleta", price: 12000, image: "/images/don-julio/provoleta.webp", description: "Lorem ipsum..." },
                              { name: "Chorizo", price: 5500, image: "", description: "Lorem ipsum..." },
                              { name: "Morcilla", price: 5500, description: "Lorem ipsum..." }
                          ],
                      },
                  },
                  { // Categoría: Carnes
                      category: "Carnes",
                      dishes: {
                          create: [
                              { name: "Bife de Chorizo", price: 27000, image: "/images/don-julio/bife-chorizo.jpg", description: "Lorem ipsum..." },
                              { name: "Ojo de Bife", price: 29000, image: "", description: "Lorem ipsum..." },
                              { name: "Entraña", price: 31000, image: "", description: "Lorem ipsum..." }
                          ],
                      },
                  },
                  { // Categoría: Postres
                      category: "Postres",
                      dishes: {
                          create: [
                              { name: "Flan", price: 7000, image: "", description: "Lorem ipsum..." },
                              { name: "Chocotorta", price: 10000, image: "", description: "Lorem ipsum..." }
                          ],
                      },
                  }
              ],
          },
      },
  });

  console.log(`✅ Restaurante '${newRestaurant.name}' creado con ID: ${newRestaurant.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Fallo crítico en el Seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Aseguramos que la conexión se cierre
    await prisma.$disconnect(); 
  });