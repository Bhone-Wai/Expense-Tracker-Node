import prisma from "../config/prisma";
import {TransactionType, CategoryType} from "@prisma/client";

export async function getAllTransactions(userId: string) {
    return prisma.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
    });
}

export async function getTransactionsByMonth(userId: string, month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    return prisma.transaction.findMany({
        where: {
            userId,
            date: {
                gte: startDate,
                lte: endDate,
            }
        },
        orderBy: { date: 'desc' },
    });
}

export async function createTransaction(data: {
    userId: string,
    title: string,
    amount: number,
    type: TransactionType,
    category: CategoryType,
    date: Date,
}) {
    return prisma.transaction.create({
        data: {
            ...data,
            amount: data.amount
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