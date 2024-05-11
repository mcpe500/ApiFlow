import { model } from "mongoose";
import userSchema from "../schema/user";
import { User } from "../type";

export default model<User>("User", userSchema);
