import { Application, Request, Response, NextFunction } from "express";
import { Resource } from "express-automatic-routes";
import { login } from "../../../../controller/auth";

export default (express: Application) => {
    return <Resource>{
        post: login,
    };
};
