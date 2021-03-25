import { body } from "express-validator";

export class FieldValidation {
    public static readonly email =  body('email')
    .isEmail()
    .trim()
    .escape()

    public static readonly username =  body('username')
    .isLength({ min: 6, max: 24 })
    .withMessage("Username must be between 6 - 24 characters long!")
    .isString()
    .withMessage("Username must be a string!")
    .trim()
    .escape();

    public static readonly password = body('password')
    .isLength({ min: 8, max: 60 })
    .withMessage("Password must be at least 8 characters!")
    .isString()
    .withMessage("Password must be a string!")
    .trim()
    .escape()
}
