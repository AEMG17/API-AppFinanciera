import { decodeToken } from '../libs/auth.lib.js';
import * as financesModel from '../model/finances.model.js';

export const getIncomes = async (req, res) => {
    try {
        const token = req.headers['x-access-token']; // Se accede al token en el encabezado de la peticion HTTP

        // El token de autenticación se analiza, si es valido se consigue el ID almacenado en Auth.
        const decoded = decodeToken(token);

        if(decoded.id){ // Si tiene ID en el objeto decoded.
            // Procede a llamar al modelo para que cargue de la DB los ingresos.
            const incomes = await financesModel.getIncomes(decoded.id);
            return res.status(200).json(incomes);
        }

        // Siempre que se llama un error, es porque sera manejado en el catch.
        // (O se da por sentado que la peticion de arriba salio mal.)
        throw new Error('No se pudo realizar esta operación')
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const addIncome = async (req, res) => {
    try {
        const { title, amount } = req.body; // Se consigue el titulo y monto del ingreso.

        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(!amount > 0){ // Chequea el monto sea mayor a 0
            throw new Error('Ingresa un monto superior a 0')
        }

        if(decoded.id){
            // Se procede a ingresar el nuevo ingreso en caso del token ser valido.
            const submitNewIncome = await financesModel.addIncome(amount, decoded.id, title);
            if(submitNewIncome > 0){ // Si el numero de filas modificadas es mas de 0, la operacion fue exitosa
                return res.status(200).json({message: "Ingreso añadido correctamente"});
            }
        }

        throw new Error('No se pudo realizar esta operación')

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}



export const removeIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(decoded.id){
            if(await financesModel.removeIncome(id, decoded.id) > 0)
                return res.status(200).json({message: "Ingreso eliminado"});
        }

        throw new Error('No se pudo eliminar el ingreso, intente denuevo');

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}



export const updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount } = req.body;
        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(decoded.id){
            if(await financesModel.updateIncome(id, decoded.id, title, amount) > 0)
                return res.status(200).json({message: "Ingreso actualizado"});
        }

        throw new Error('No se pudo actualizar el ingreso, intente denuevo');
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getBills = async (req, res) => {
    try {
        const token = req.headers['x-access-token']; 

        const decoded = decodeToken(token);

        if(decoded.id){ 
            const bills = await financesModel.getBills(decoded.id);
            return res.status(200).json(bills);
        }

        throw new Error('No se pudo realizar esta operación')
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const addBill = async (req, res) => {
    try {
        const { title, amount } = req.body;

        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(!amount > 0){
            throw new Error('Ingresa un monto superior a 0')
        }

        if(decoded.id){
            const submitNewBill = await financesModel.addBill(amount, decoded.id, title);
            if(submitNewBill > 0){ // Si la cantidad de filas afectadas es mayor a 0 es porque se creo el registro.
                return res.status(200).json({message: "Gasto añadido correctamente"});
            }
        }
        
        throw new Error('No se pudo realizar esta operación')

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}



export const removeBill = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(decoded.id){
            if(await financesModel.removeBill(id, decoded.id) > 0)
                return res.status(200).json({message: "Gasto eliminado"});
        }

        throw new Error('No se pudo eliminar el gasto, intente denuevo');
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


export const updateBill = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount } = req.body;
        const token = req.headers['x-access-token'];

        const decoded = decodeToken(token);

        if(decoded.id){
            if(await financesModel.updateBill(id, decoded.id, title, amount) > 0)
                return res.status(200).json({message: "Gasto actualizado"});
        }

        throw new Error('No se pudo actualizar el gasto, intente denuevo');
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}