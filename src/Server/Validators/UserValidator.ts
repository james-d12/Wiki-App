import express from "express";
import { FieldValidation } from "./FieldValidation";


export class UserValidator {
    public static loginPost() {
        return [
            FieldValidation.username,
            FieldValidation.password
        ]
    }

    public static signupPost() {
        return [
            FieldValidation.email,
            FieldValidation.username,
            FieldValidation.password 
        ]
    }

    public static sessionChecker(req : express.Request, res : express.Response, next : express.NextFunction) {
        if (req.session.loggedIn) {
            res.redirect('/user/home');
        } else {
            next();
        }    
    };
}