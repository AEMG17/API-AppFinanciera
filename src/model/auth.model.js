import { databaseClient } from '../database/index.js';


export const createUser = async (name, email, password) => {
    try {
        const newUser = await databaseClient.execute({
            sql: "INSERT INTO users(name,email,password) VALUES(?, ?, ?)",
            args: [name, email, password]
        })

        return newUser.lastInsertRowid;
    } catch (error) {
        return new Error('No se pudo crear el usuario');
    }
}

export const getUser = async (email) => {
    try {
        const findUser = await databaseClient.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [email]
        })
    
        return findUser.rows;
    } catch (error) {
        return new Error('No se pudo encontrar el usuario');
    }
}

export const getUsers = async (id) => {
    try {
        const findUser = await databaseClient.execute({
            sql: "SELECT u.name, u.image FROM users u WHERE user_id = ?",
            args: [id]
        })
        return findUser.rows;
    } catch (error) {
        return new Error('No se pudo encontrar el usuario');
    }
}

export const updateImage = async (url, id) => {
    try {
        const updateRow = await databaseClient.execute({
            sql: "UPDATE users SET image = ? WHERE user_id = ?",
            args: [url, id]
        })

        return updateRow.rowsAffected;
    } catch (error) {
        return new Error('No se pudo actualizar el usuario');
    }
}