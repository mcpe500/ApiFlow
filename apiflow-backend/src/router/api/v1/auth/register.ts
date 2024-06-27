import { Application } from "express";
import { Resource } from "express-automatic-routes";
import { register } from "../../../../controller/auth";

export default (express: Application) => {
    return <Resource>{
        post: register,
    };
};
