import { Schema } from "mongoose";
import { User } from "../types";
export default new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    refreshToken: { type: String, required: true },
});
