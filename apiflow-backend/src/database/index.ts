import mongoose from "mongoose";
import { connect, set } from "mongoose";
import { mongo, node } from "../config";
import { log, error as errorLogging, debug } from "../../utility/logging";

mongoose.connection.on("connected", () =>
    log("Mongoose connected succesfully to MongoDB", "DB"),
);
mongoose.connection.on("disconnected", () =>
    log("Mongoose has been disconnected from MongoDB", "DB"),
);
mongoose.connection.on("close", () =>
    log("Mongoose connection from MongoDB has been closed", "DB"),
);
set("debug", (collectionName: string, method, query, doc) => {
    log(`${collectionName}.${method} ${JSON.stringify(query)}`, "DB");
});

export const startDatabase = async () => {
    try {
        log("Attempting to connect to MongoDB using Mongoose", "DB");
        const uri = `mongodb://${mongo.host}:${mongo.port}/${mongo.name}`;
        await connect(uri);
    } catch (error) {
        if (node.environment === "development") {
            //@ts-ignore
            errorLogging(error);
        }
        errorLogging("Mongoose failed to connect!", "DB");
    }
};
