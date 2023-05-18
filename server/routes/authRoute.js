import express from 'express';
import { forgetPassword, login, register, resetPassword } from '../controller/authController.js'

const router = express.Router();

router.route("/register").post(register);

router.route('/login').post(login);

router.route("/forget-password").post(forgetPassword);

router.route("/reset-password/:resetToken").put(resetPassword);


export default router