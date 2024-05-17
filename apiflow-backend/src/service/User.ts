import User from "../model/User";
import { ApiError } from "../types";
import bcrypt from "bcrypt";

export const getUser = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
};

export const loginUser = async (email: string, password: string) => {
    const user = await getUser(email);
    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (!bcrypt.compareSync(password, user.password)) {
        throw new ApiError("Invalid password", 401);
    }

    return {
        user: user,
        status: 200,
    };
};
