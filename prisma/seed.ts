/*
import prisma from "../src/config/prisma";

async function main() {
    console.log('Started seeding...');

    await prisma.transaction.deleteMany();
    await prisma.monthlyBudget.deleteMany();
    await prisma.categoryBudget.deleteMany();
    await prisma.month.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.upsert({
        where: { id: 'user1' },
        update: {},
        create: {
            id: 'user1',
            name: 'Bhone Wai',
        }
    });

    const month = await prisma.month.upsert({
        where: {
            userId_month_year: {
                userId: user.id,
                month: 6,
                year: 2025,
            }
        },
        update: {},
        create: {
            userId: user.id,
            month: 6,
            year: 2025,
        }
    });

    await prisma.transaction.createMany({
        data: [
            {
                userId: user.id,
                monthId: month.id,
                title: 'Breakfast',
                amount: 45.00,
                type: 'EXPENSE',
                category: 'NEEDS',
                date: new Date(),
            },
            {
                userId: user.id,
                monthId: month.id,
                title: 'Lunch',
                amount: 50.00,
                type: 'EXPENSE',
                category: 'NEEDS',
                date: new Date(),
            }
        ]
    });

    await prisma.monthlyBudget.create({
        data: {
            monthId: month.id,
            totalBudget: 7000.00,
        }
    });

    await prisma.categoryBudget.createMany({
        data: [
            {
                monthId: month.id,
                category: 'NEEDS',
                amount: 55.00,
            },
            {
                monthId: month.id,
                category: 'WANTS',
                amount: 2700.00,
            },
        ],
    })

    console.log('Seed completed...')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());*/
