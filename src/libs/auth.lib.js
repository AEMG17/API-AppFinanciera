import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config.js';


export const hashPassword = async (password) => {
    try {
        const salt = 10; // Cantidad de rondas para el algoritmo de hasheo
        // Genera un hash para la contraseña nueva
        return await bcrypt.hash(password, salt);
    } catch (error) {
        return "";
    }
}

export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash); // Compara las contraseñas y retorna true/false
    } catch (error) {
        return false;
    }
}

export const createToken = (identifier, time) => {
    try {
        return jwt.sign({id: identifier}, config.SECRET, {expiresIn: time}); // Firma el token, con clave secreta, id  y tiempo de expiracion
    } catch (error) {
        return error.message;
    }
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, config.SECRET) // Desencripta el token de la peticion.
    } catch (error) {
        return {};
    }
}