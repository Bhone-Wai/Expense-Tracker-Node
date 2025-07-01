import prisma from "../config/prisma";
import {TransactionType, IncomeCategory, ExpenseCategory} from "@prisma/client";

export async function getAllTransactions(userId: string, limit?: number) {
    const where = { userId };

    if (limit) {
        return prisma.transaction.findMany({
            where,
            orderBy: { date: 'desc' },
            take: limit
        });
    }

    return prisma.transaction.findMany({
        where,
        orderBy: { date: 'desc' },
    });
}

export async function getTransactionsByMonth(userId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const transactions = await prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            }
        },
        orderBy: { date: 'desc' },
    });

    const totalIncome = transactions
        .filter(t => t.type === 'INCOME')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const netAmount = totalIncome - totalExpense;

    return {
        transactions,
        summary: {
            totalTransactions: transactions.length,
            totalIncome,
            totalExpense,
            netAmount
        }
    }
}

export async function createTransaction(data: {
    userId: string,
    title: string,
    amount: number,
    type: TransactionType,
    incomeCategory?: IncomeCategory,
    expenseCategory?: ExpenseCategory,
    date: Date,
}) {
    if (data.type === 'INCOME') {
        if (!data.incomeCategory || data.expenseCategory) {
            throw new Error('Income transactions must have incomeCategory only');
        }
    } else if (data.type === 'EXPENSE') {
        if (!data.expenseCategory || data.incomeCategory) {
            throw new Error('Expense transactions must have expenseCategory only');
        }
    }
    return prisma.transaction.create({
        data: {
            userId: data.userId,
            title: data.title,
            amount: data.amount,
            type: data.type,
            incomeCategory: data.incomeCategory,
            expenseCategory: data.expenseCategory,
            date: data.date
        }
    });
}

export async function deleteTransaction(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
        where: {
            id,
            userId,
        }
    });

    if (!transaction) {
        throw new Error(`Transaction ${id} not found or you don't have permission to delete it`);
    }

    return prisma.transaction.delete({
        where: { id }
    });
}