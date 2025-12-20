import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) throw new Error("Missing ADMIN_PASSWORD in env");

    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await db.adminUser.upsert({
        where: { id: 1 },
        update: {
            name: process.env.ADMIN_NAME ?? "Admin",
            email: process.env.ADMIN_EMAIL ?? "admin@tienda.com",
            username: process.env.ADMIN_USERNAME ?? "admin",
        },
        create: {
            id: 1,
            name: process.env.ADMIN_NAME ?? "Admin",
            username: process.env.ADMIN_USERNAME ?? "admin",
            email: process.env.ADMIN_EMAIL ?? "admin@tienda.com",
            passwordHash,
        },
    });

    // 2) Textos globales de categorías (1.1 y preparado)
    await db.perfumeCategoryInfo.upsert({
        where: { category: "ONE_ONE" },
        update: {
            title: "1.1",
            description:
                "Más duradero; un poco más caro, pero con mejor fijación y casi una réplica exacta del original.",
        },
        create: {
            category: "ONE_ONE",
            title: "1.1",
            description:
                "Más duradero; un poco más caro, pero con mejor fijación y casi una réplica exacta del original.",
        },
    });

    await db.perfumeCategoryInfo.upsert({
        where: { category: "PREPARADO" },
        update: {
            title: "Preparado",
            description:
                "Preparado con esencias para conseguir un aroma muy similar; normalmente más económico.",
        },
        create: {
            category: "PREPARADO",
            title: "Preparado",
            description:
                "Preparado con esencias para conseguir un aroma muy similar; normalmente más económico.",
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
