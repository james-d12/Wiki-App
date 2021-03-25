import express from "express";
import { homeRouter } from "./HomeRouter";
import { userRouter } from "./UserRouter";

export const router : express.Router = express.Router();

router.use("/", homeRouter);
router.use("/user", userRouter);