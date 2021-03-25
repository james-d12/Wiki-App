import express from "express";

export interface IUserController {
    loginGet(req : express.Request, res : express.Response) : any;
    loginPost(req : express.Request, res : express.Response) : any;
    signupGet(req : express.Request, res : express.Response) : any;
    signupPost(req : express.Request, res : express.Response) : any;
}