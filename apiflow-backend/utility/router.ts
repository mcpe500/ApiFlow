import { Application } from "express";
import fs from "fs";
import path from "path";
import app from "../src/app";

/**
 *
 * @param app
 * @param routerPath
 */
export const registerRouter = async (
    app: Application,
    routerPath: string = "../src/router"
) => {
    const routerDirPath = path.join(__dirname, routerPath);
    const items = fs.readdirSync(routerDirPath);
    for (const item of items) {
        const router = fs.statSync(path.join(routerDirPath, item));

        if (router.isDirectory()) {
            registerRouter(app, path.join(routerPath, item));
        } else {
            if (item.endsWith(".ts")) {
                const routerPath = path.join(routerDirPath, item);
                const fullPathSplitted = splitFullPath(routerPath);

                const endpoint = fullPathSplitted.pop()?.split(".")[0];

                const endpointName = endpoint === "index" ? "" : "/" + endpoint;
                const router = (await import(routerPath)).default;
                const endpointPath =
                    "/" +
                    fullPathSplitted.join("/") +
                    "/student" +
                    endpointName;
                app.use(endpointPath, router);

                console.log(endpointPath);
                console.log(router);
            }
        }
    }
};

/**
 *
 * @param fullPath
 * @returns
 */
const splitFullPath = (fullPath: string) => {
    const startIndex = fullPath.indexOf("router") + "router\\".length;
    return fullPath.slice(startIndex).split("\\");
};
