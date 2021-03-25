import express from "express";
import { User } from "@models/UserModel";
import { IUserController } from "@interfaces/IUserController";

class UserController implements IUserController {
    public homeGet(req: express.Request, res: express.Response){
        res.render("pages/user/home");
    }

    public loginGet(req: express.Request, res: express.Response) {
        res.render("pages/user/login");
    }

    public signupGet(req: express.Request, res: express.Response) {
        res.render("pages/user/signup");
    }

    public async loginPost(req: express.Request, res: express.Response) {
        let errors : any = { "errors": []};
        const username: string = req.body.username;
        const password: string = req.body.password;
        const user = await User.findOne({ where: { username } });
        
        if (user != null) {
            user.isSamePassword(password).then(isSame => {
                if(isSame){
                    res.status(200).redirect("/user/home");
                } else {
                    errors['errors'].push({ "password": `Password is incorrect.`});
                    res.status(500).render('/user/login', { errors: errors['errors'] });
                }
            }).catch(err => {
                console.error(`[ERROR]: ${err.message}`);
                res.status(500).json(errors);
            });
        } else {
            errors['errors'].push({ "username": `User with username: ${username} does not exist.` });
            res.status(500).json(errors);
        }
    }

    public async signupPost(req: express.Request, res: express.Response) {
        let errors : any = { "errors": []};
        const email: string = req.body.email;
        const username: string = req.body.username;
        const password: string = req.body.password;

        const doesExistWithEmail : boolean = (await User.findOne({ where: { email: email }}) != null) ? true : false;
        const doesExistWithUsername : boolean = (await User.findOne({ where: { username: username }}) != null) ? true : false;

        if(doesExistWithEmail){
            errors['errors'].push({ "email": "Account with email already exists." });
        } 

        if(doesExistWithUsername){
            errors['errors'].push({ "email": "Account with username already exists." });
        } 

        if(!doesExistWithEmail || !doesExistWithUsername){
            try {
                await User.create({ email: email, username: username, password: password });
                res.status(200).redirect("/user/home")
            } catch (err) {
                console.error(`[ERROR]: ${err.message}`);
                res.status(500).json(errors);
            }
        } else {
            res.status(500).json(errors);
        }

    }
}

export default new UserController();