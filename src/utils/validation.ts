export const validateTransactionData = (data: any) => {
    const errors: string[] = [];

    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
        errors.push('Amount must be a positive number');
    }

    if (!['INCOME', 'EXPENSE'].includes(data.type)) {
        errors.push('Type must be INCOME or EXPENSE');
    }
    if (!data.date) errors.push('Date is required');

    if (data.type === 'INCOME' && !data.incomeCategory) {
        errors.push('Income category is required for income transactions');
    }

    if (data.type === 'EXPENSE' && !data.expenseCategory) {
        errors.push('Expense category is required for expense transactions');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export const parseMonthYear = (month: string, year: string) => {
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        throw new Error('Invalid month');
    }

    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
        throw new Error('Invalid year');
    }

    return { month: monthNum, year: yearNum };
};