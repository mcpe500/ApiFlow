import { PORT } from "./config/ConnectionRelated";
import app from "./app";
import { registerRouter } from "../utility/router";

(async () => {
    await registerRouter(app);
    app.listen(PORT, () => {
        console.log("Server running on port 3000");
    });
})();
