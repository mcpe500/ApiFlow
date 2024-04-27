import "dotenv/config";
import { PORT } from "./config/ConnectionRelated";
import app from "./app";
import autoRoutes from "express-automatic-routes";

(async () => {
    autoRoutes(app, {
        dir: "./router",
        log: true,
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
