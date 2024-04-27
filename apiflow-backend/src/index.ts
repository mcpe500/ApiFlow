import express, { Express, Request, Response } from "express";
import { PORT } from "./config/ConnectionRelated";
import cookieParser from "cookie-parser";

const app: Express = express();

// Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World");
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
