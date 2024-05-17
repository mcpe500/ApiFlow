import { Request, Response } from "express";
import { loginUser } from "../../service/User";
import { ApiError } from "../../types";
import { error as errorLog } from "../../../utility/logging";
import { Token } from "../../../utility/token";
import { loginSchema } from "../../validation/user";
import { ZodError } from "zod";
import { generateToken } from "../../../utility/token";

export const login = async (req: Request, res: Response) => {
    let email = "",
        passwordData = "",
        rememberMe = false;

    try {
        const result = loginSchema.parse(req.body);
        email = result.email;
        passwordData = result.password;
        rememberMe = result.rememberMe;
    } catch (error) {
        if (error instanceof ZodError) {
            errorLog(error, "validation");
            // @ts-ignore
            return res.status(400).json({
                message:
                    error.flatten().fieldErrors.rememberMe?.[0] ??
                    "Validation error",
            });
        }
    }

    let user;
    try {
        user = (await loginUser(email, passwordData)).user;
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

    const { password, ...userWithoutPassword } = user;

    const accessToken = generateToken(
        userWithoutPassword,
        Token.ACCESS,
        15 * 60,
    );

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

    return res.status(200).send("Logged in succesfully");
};
