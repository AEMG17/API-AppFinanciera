import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config.js';


export const hashPassword = async (password) => {
    try {
        const salt = 10;
        return await bcrypt.hash(password, salt);
    } catch (error) {
        return "";
    }
}

export const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        return false;
    }
}

export const createToken = (identifier, time) => {
    try {
        return jwt.sign({id: identifier}, config.SECRET, {expiresIn: time});
    } catch (error) {
        return error.message;
    }
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, config.SECRET)
    } catch (error) {
        return {};
    }
}