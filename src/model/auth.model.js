import { databaseClient } from '../database/index.js';

// El modelo se encarga de manejar los datos del controlador 
// Y los utiliza para realizar consultas a la DB

export const createUser = async (name, email, password) => {
    try {
        // Inserta nuevo registro en tabla usuarios.
        const newUser = await databaseClient.execute({
            sql: "INSERT INTO users(name,email,password) VALUES(?, ?, ?)",
            args: [name, email, password]
        })

        return newUser.lastInsertRowid; // Devuelve un bigInt ejemplo 7n
    } catch (error) {
        return new Error('No se pudo crear el usuario');
    }
}

export const getUser = async (email) => {
    try {
        // Busca el usuario por email
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
        // Busca todos los usuarios.
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
        // Busca todos los usuarios.
        const updateRow = await databaseClient.execute({
            sql: "UPDATE users SET image = ? WHERE user_id = ?",
            args: [url, id]
        })

        return updateRow.rowsAffected;
    } catch (error) {
        return new Error('No se pudo actualizar el usuario');
    }
}