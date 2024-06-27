import { Request, Response } from "express";
import { getUser, createUser } from "../service/User";
import { ApiError } from "../types";
import { error as errorLog } from "../../utility/logging";
import { Token } from "../../utility/token";
import { loginSchema, registerSchema } from "../validation/user";
import { generateToken } from "../../utility/token";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
    const { success, data, error } = loginSchema.safeParse(req.body);

    if (!success) {
        errorLog(error, "validation");
        return res.status(400).json({ message: error.message });
    }

    const { email, password: passwordData, rememberMe } = data;

    try {
        const user = await getUser(email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        if (!bcrypt.compareSync(passwordData, user.password)) {
            throw new ApiError("Invalid password", 400);
        }

        const { password, ...userWithoutPassword } = user;

        const accessToken = generateToken(
            userWithoutPassword,
            Token.ACCESS,
            // 15 minutes
            15 * 60,
        );

        // Append the token to cookie.
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).send("Logged in succesfully");
    } catch (error) {
        errorLog(error, "api");
        if (error instanceof ApiError) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const register = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body);

    if (!success) {
        errorLog(error, "validation");
        return res.status(400).json({ message: error.message });
    }

    const { email, password, name, username } = data;

    try {
        // If registration failed it will throw an error (hopefully)
        // Refresh token set to undefined because this is a registration process, and i used the User type for the createUser :)
        const createdUser = await createUser({
            ...data,
            refreshToken: undefined,
        });

        return res
            .status(201)
            .json({ message: "Registration succesful!", data: createdUser });
    } catch (error) {
        if (error instanceof ApiError) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};
