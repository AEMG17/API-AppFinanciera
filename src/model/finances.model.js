import { databaseClient } from '../database/index.js';


export const getIncomes = async (user_id) => {
    try {
        const incomes = await databaseClient.execute({
            sql: "SELECT i.id, i.title, i.amount, i.date FROM incomes AS i INNER JOIN users AS u ON i.user_id = u.user_id WHERE i.user_id = ?",
            args: [user_id]
        });

        return incomes.rows;
    } catch (error) {
        return new Error('No se pudo obtener los ingresos');
    }
}

export const getBills = async (user_id) => {
    try {
        const bills = await databaseClient.execute({
            sql: "SELECT b.id, b.title, b.amount, b.date FROM bills AS b INNER JOIN users AS u ON b.user_id = u.user_id WHERE b.user_id = ?",
            args: [user_id]
        });

        return bills.rows;
    } catch (error) {
        return new Error('No se pudo obtener los gastos');
    }
}

export const addIncome = async (amount, user_id, title) => {
    try {
        const newIncome = await databaseClient.execute({
            sql: "INSERT INTO incomes (amount, user_id, title, date) VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, '-6 hours'))",
            args: [amount, user_id, title]
        });

        return newIncome.rowsAffected;
    } catch (error) {
        return new Error('No se pudo crear el ingreso');
    }
}



export const removeIncome = async (id, user) => {
    try {
        const deleteIncome = await databaseClient.execute({
            sql: "DELETE FROM incomes WHERE user_id = ? AND id = ?",
            args: [user, id]
        })

        return deleteIncome.rowsAffected;
    } catch (error) {
        return new Error('No se pudo eliminar el ingreso');
    }
}



export const updateIncome = async (id, user, title, amount) => {
    try {
        const updated = await databaseClient.execute({
            sql: "UPDATE incomes SET title = ?, amount = ? WHERE user_id = ? AND id = ?",
            args: [title, amount, user, id]
        })

        return updated.rowsAffected;
    } catch (error) {
        return new Error('No se pudo actualizar el ingreso');
    }
}

export const addBill = async (amount, user_id, title) => {
    try {
        const newIncome = await databaseClient.execute({
            sql: "INSERT INTO bills (amount, user_id, title, date) VALUES (?, ?, ?, datetime(CURRENT_TIMESTAMP, '-6 hours'))",
            args: [amount, user_id, title]
        });

        return newIncome.rowsAffected;
    } catch (error) {
        return new Error('No se pudo crear el gasto');
    }
}

export const removeBill = async (id, user) => {
    try {
        const deleteBill = await databaseClient.execute({
            sql: "DELETE FROM bills WHERE user_id = ? AND id = ?",
            args: [user, id]
        })

        return deleteBill.rowsAffected;
    } catch (error) {
        return new Error('No se pudo eliminar el gasto');
    }
}

export const updateBill = async (id, user, title, amount) => {
    try {
        const updated = await databaseClient.execute({
            sql: "UPDATE bills SET title = ?, amount = ? WHERE user_id = ? AND id = ?",
            args: [title, amount, user, id]
        })

        return updated.rowsAffected;
    } catch (error) {
        return new Error('No se pudo actualizar el gasto');
    }
}