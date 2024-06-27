import UserModel from "../model/User";
import type { User } from "../types";
import { ApiError } from "../types";
import bcrypt from "bcrypt";

export const getUser = async (email: string) => {
    const user = await UserModel.findOne({ email: email });
    return user;
};

export const createUser = async (data: User) => {
    const createdUser = await UserModel.create(data);
    return createdUser;
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
