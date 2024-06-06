import * as authModel from '../model/auth.model.js';
import { comparePassword, createToken, hashPassword, decodeToken } from '../libs/auth.lib.js';

export const getUser = async (req, res) => {
    try {

        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if (decoded.id) {
            const user = await authModel.getUsers(decoded.id); 
            return res.status(200).json(user);
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message });
    }
}


export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(401).json({ "error": "Ingresa todos los campos" });
        }

        
        const userExist = await authModel.getUser(email);

        if (userExist.length > 0) {
            throw new Error("Este usuario ya existe");
        }

        
        const hash = await hashPassword(password);

        
        const newUser = await authModel.createUser(name, email, hash);


        if (newUser) {
            const addedUser = await authModel.getUser(email);
            
            const token = createToken(Number(newUser), 2597000);
            return res.status(200).json({ token: token }); 
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message });
    }
}


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await authModel.getUser(email);

        if (findUser.length > 0) {
            
            if (await comparePassword(password, findUser[0].password)) {
                
                return res.status(200).json({ token: createToken(findUser[0].user_id, 2597000) });
            } else {
                throw new Error('Contraseña Incorrecta');
            }
        } else {
            throw new Error('Usuario no existente');
        }

    } catch (error) {
        return res.status(500).json({ "error": error.message });
    }
}

export const updateImage = async (req, res) => {
    try {
        const uploadedImage = req.imageUrl;

        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if (decoded.id) {
            const update = await authModel.updateImage(uploadedImage, decoded.id);
            if (update > 0) {
                return res.status(200).json({ "message": "Imagen actualizada" });
            }
        }

        throw new Error('Error al actualizar la imagen')

    } catch (error) {
        return res.status(500).json({ "error": error.message });
    }
}