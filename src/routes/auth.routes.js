import { Router } from "express";
import * as authController from '../controller/auth.controller.js';
import { uploadImage } from '../libs/imageHandler.js';

const router = Router();

router.get('/users', authController.getUser);
router.post('/users', authController.createUser);
router.post('/signin', authController.signin);
router.put('/image', uploadImage('image'), authController.updateImage);

export {
    router
};