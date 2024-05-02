import { Application, Request, Response, NextFunction } from "express";
import { Resource } from "express-automatic-routes";
import { login } from "../../controller/api/login";

export default (express: Application) => {
    return <Resource>{
        post: login,
    };
};
