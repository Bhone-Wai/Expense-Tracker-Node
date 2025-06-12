import prisma from "../config/prisma";
import {ExpenseCategory} from "@prisma/client";

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
    category: ExpenseCategory,
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
    });
}

export async function getBudgetVsActual(userId: string, month: number, year: number) {
    const budgets = await getBudgetForMonth(userId, month, year);

    const startDate = new Date(year, month -1, 1);
    const endDate = new Date(year, month, 0, 23, 23, 59);

    const expenses = await prisma.transaction.findMany({
        where: {
            userId,
            type: 'EXPENSE',
            date: {
                gte: startDate,
                lte: endDate,
            }
        }
    });

    const actualSpending = expenses.reduce((acc, expense) => {
        const category = expense.expenseCategory!;
        acc[category] = (acc[category] || 0) + Number(expense.amount);
        return acc;
    }, {} as Record<ExpenseCategory, number>);

    return budgets.map(budget => ({
        category: budget.category,
        budgeted: Number(budget.budgetAmount),
        actual: actualSpending[budget.category] || 0,
        remaining: Number(budget.budgetAmount) - (actualSpending[budget.category] || 0),
        percentUsed: ((actualSpending[budget.category] || 0) / Number(budget.budgetAmount)) * 100
    }));
}