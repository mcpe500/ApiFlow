import { model } from "mongoose";
import userSchema from "../schema/user";
import { User } from "../types";

export default model<User>("User", userSchema);
