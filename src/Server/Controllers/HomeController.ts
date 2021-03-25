import express from "express";
import { IHomeController } from "@interfaces/IHomeController";

/**
 * Defines the routes for the home.
 */
class HomeController implements IHomeController {
    public homeGet(req : express.Request, res : express.Response) {
        res.render("pages/home");
    }
}

export default new HomeController();