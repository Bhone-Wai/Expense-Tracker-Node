import prisma from "../config/prisma";
import {CategoryType} from "@prisma/client";

export async function getBudgetForMonth(userId: string, month: number, year: number) {
    return prisma.budget.findMany({
        where: {
            userId,
            month,
            year,
        }
    });
}

export async function getTotalMonthBudget(userId: string, month: number, year: number) {
    const result = await prisma.budget.aggregate({
        where: {
            userId,
            month,
            year,
        },
        _sum: {
            budgetAmount: true,
        }
    });

    return result._sum.budgetAmount || 0;
}

export async function setBudgetForCategory(
    userId: string,
    category: CategoryType,
    month: number,
    year: number,
    amount: number
) {
    return prisma.budget.upsert({
        where: {
            userId_category_month_year: {
                userId,
                category,
                month,
                year,
            }
        },
        update: {
            budgetAmount: amount,
            updatedAt: new Date()
        },
        create: {
            userId,
            category,
            month,
            year,
            budgetAmount: amount,
        }
    })
}