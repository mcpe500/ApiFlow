import { Application, Request, Response, NextFunction } from "express";
import { Resource } from "express-automatic-routes";

export default (express: Application) => {
    return <Resource>{
        post: (req: Request, res: Response) => {
            return res.status(200).send("Posting on /api/auth/register");
        },
    };
};
