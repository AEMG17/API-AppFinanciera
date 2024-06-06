import { Router } from "express";
import * as financesController from '../controller/finances.controller.js';

const router = Router();

// Diferentes endpoints para los tipos de rutas

// # localhost:3000/api/finances/incomes - GET (Este lista registros)
router.get('/incomes', financesController.getIncomes);
// # localhost:3000/api/finances/incomes - POST (Este añade registros)
router.post('/incomes', financesController.addIncome);
router.delete('/incomes/:id', financesController.removeIncome);
router.put('/incomes/:id', financesController.updateIncome);

router.get('/bills', financesController.getBills);
router.post('/bills', financesController.addBill);
router.delete('/bills/:id', financesController.removeBill);
router.put('/bills/:id', financesController.updateBill);

export {
    router
};