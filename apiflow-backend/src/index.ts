import "dotenv/config";
import { app as appConnection } from "./config";
import app from "./app";
import autoRoutes from "express-automatic-routes";
import { startDatabase } from "./database";
import { log } from "../utility/logging";

(async () => {
    autoRoutes(app, {
        dir: "./router",
        log: true,
    });

    await startDatabase();

    app.listen(appConnection.port, () => {
        log(`Server running on port ${appConnection.port}`, "APP");
    });
})();
