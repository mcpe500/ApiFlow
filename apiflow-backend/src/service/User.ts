import UserModel from "../model/User";
import type { User } from "../types";

export const getUser = async (email: string) => {
    const user = await UserModel.findOne({ email: email });
    return user;
};

export const createUser = async (data: User) => {
    const createdUser = await UserModel.create(data);
    return createdUser;
};
