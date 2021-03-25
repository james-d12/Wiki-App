import express from "express";
import homeController from "@controllers/HomeController";

export const homeRouter : express.Router = express.Router();

homeRouter.get('/', homeController.homeGet);