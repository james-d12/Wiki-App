import express from "express";

export interface IHomeController {
    homeGet(req : express.Request, res : express.Response) : any;
}