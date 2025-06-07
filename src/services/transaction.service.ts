import prisma from "../config/prisma";
import {date} from "zod";

export async function getAllTransactions(userId: string) {
    return prisma.transaction.findMany({
        where: userId,
        orderBy: { date: 'desc' },
    });
}

export async function getTransactionById(id: string) {
    return prisma.transaction.findUnique({
        where: id,
    });
}

export async function createTransaction(data: {
    userId: string,
    monthId: string,
    title: string,
    amount: number,
    type: 'INCOME' | 'EXPENSE',
    category: 'WANTS' | 'NEEDS' | 'SAVINGS',
    date: Date,
}) {
    return prisma.transaction.create({ data });
}