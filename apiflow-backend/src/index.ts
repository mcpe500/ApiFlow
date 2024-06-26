import "dotenv/config";
import { app as appConnection } from "./config";
import app from "./app";
import autoRoutes from "express-automatic-routes";
import { startDatabase } from "./database";
import { log } from "../utility/logging";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./documentation";

(async () => {
    autoRoutes(app, {
        dir: "./router",
        log: true,
    });

    await startDatabase();

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(appConnection.port, () => {
        log(`Server running on port ${appConnection.port}`, "APP");
    });
})();
