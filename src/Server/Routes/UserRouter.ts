import express from "express";
import { validate } from "@validators/Validate";
import userController from "@controllers/UserController";
import { UserValidator } from "@validators/UserValidator";
export const userRouter : express.Router = express.Router();

userRouter.get('/home', UserValidator.sessionChecker, userController.homeGet);
userRouter.get('/login', userController.loginGet);
userRouter.get('/signup', userController.signupGet);

userRouter.post('/login', UserValidator.loginPost(), validate, userController.loginPost);
userRouter.post('/signup', UserValidator.signupPost(), validate, userController.signupPost);