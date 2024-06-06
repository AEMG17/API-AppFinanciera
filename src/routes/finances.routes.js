import { Router } from "express";
import * as financesController from '../controller/finances.controller.js';

const router = Router();


router.get('/incomes', financesController.getIncomes);

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