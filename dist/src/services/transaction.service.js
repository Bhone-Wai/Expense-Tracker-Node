"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = getAllTransactions;
exports.getTransactionById = getTransactionById;
exports.createTransaction = createTransaction;
const prisma_1 = __importDefault(require("../config/prisma"));
async function getAllTransactions(userId) {
    return prisma_1.default.transaction.findMany({
        where: userId,
        orderBy: { date: 'desc' },
    });
}
async function getTransactionById(id) {
    return prisma_1.default.transaction.findUnique({
        where: id,
    });
}
async function createTransaction(data) {
    return prisma_1.default.transaction.create({ data });
}
