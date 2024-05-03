import { Application, Request, Response, NextFunction } from "express";
import { Resource } from "express-automatic-routes";

export default (express: Application) => {
    return <Resource>{
        get: (req: Request, res: Response) => {
            return res.status(200).send("Hello, World!");
        },
    };
};
