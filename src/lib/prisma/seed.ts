import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'
import { Role } from '@/generated/prisma/enums';

async function main() {
    console.log('--- Iniciando Seeding (Borrar y Crear) ---');

    await prisma.dish.deleteMany();

    await prisma.menuCategory.deleteMany();
    await prisma.user.deleteMany();

    await prisma.restaurant.deleteMany();
    await prisma.wifi.deleteMany();

    console.log('✅ Datos antiguos eliminados con éxito.');

    const rawPasswordSuperAdmin = '' //COMPLETAR
    const emailSuperAdmin = '' //COMPLETAR

    const rawRestaurantPassword = '' //COMPLETAR
    const emailRestaurantAdmin = '' //COMPLETAR

    const hashedPasswordSuperAdmin = await bcrypt.hash(rawPasswordSuperAdmin, 10);
    const hashedPasswordRestaurantAdmin = await bcrypt.hash(rawRestaurantPassword, 10);


    const superAdmin = await prisma.user.create({
        data: {
            name: "Super Administrator",
            email: emailSuperAdmin,
            password: hashedPasswordSuperAdmin,
            role: Role.SUPERADMIN,
        }
    })

    console.log(`✅ Usuario SuperAdmin creado: ${superAdmin.email}`)

    const newRestaurant = await prisma.restaurant.create({
        data: {
            slug: "parrilla-don-julio",
            name: "Parrilla Don Julio",
            image: "/images/don-julio/don-julio-logo.png",

            wifi: {
                create: {
                    name: "Wifi Don Julio",
                    password: "DonJulio123",
                },
            },

            users: {
                create: {
                    name: "Admin Don Julio",
                    email: emailRestaurantAdmin,
                    password: hashedPasswordRestaurantAdmin,
                    role: Role.RESTAURANT_ADMIN
                }
            },

            menuCategories: {
                create: [
                    {
                        category: "Entradas",
                        dishes: {
                            create: [
                                { name: "Provoleta", price: 12000, image: "/images/don-julio/provoleta.webp", description: "Lorem ipsum..." },
                                { name: "Chorizo", price: 5500, image: "", description: "Lorem ipsum..." },
                                { name: "Morcilla", price: 5500, description: "Lorem ipsum..." }
                            ],
                        },
                    },
                    {
                        category: "Carnes",
                        dishes: {
                            create: [
                                { name: "Bife de Chorizo", price: 27000, image: "/images/don-julio/bife-chorizo.jpg", description: "Lorem ipsum..." },
                                { name: "Ojo de Bife", price: 29000, image: "", description: "Lorem ipsum..." },
                                { name: "Entraña", price: 31000, image: "", description: "Lorem ipsum..." }
                            ],
                        },
                    },
                    {
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
        await prisma.$disconnect();
    });