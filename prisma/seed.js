"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../src/config/prisma"));
async function main() {
    const user = await prisma_1.default.user.upsert({
        where: { id: 'user1' },
        update: {},
        create: {
            id: 'user1',
            name: 'Bhone Wai',
        }
    });
    const month = await prisma_1.default.month.create({
        data: {
            userId: user.id,
            month: 6,
            year: 2025,
        }
    });
    await prisma_1.default.transaction.createMany({
        data: [
            {
                userId: user.id,
                monthId: month.id,
                title: 'Breakfast',
                amount: 45,
                type: 'EXPENSE',
                category: 'NEEDS',
                date: new Date().toISOString(),
            },
            {
                userId: user.id,
                monthId: month.id,
                title: 'Lunch',
                amount: 50,
                type: 'EXPENSE',
                category: 'NEEDS',
                date: new Date().toISOString(),
            }
        ]
    });
    console.log('Seed completed...');
}
main()
    .catch(console.error)
    .finally(() => prisma_1.default.$disconnect());
