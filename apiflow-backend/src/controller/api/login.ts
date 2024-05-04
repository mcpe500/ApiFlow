import { Request, Response } from "express";
import { loginUser } from "../../service/User";
import { ApiError } from "../../types";
import { error as errorLog } from "../../../utility/logging";
import jwt from "jsonwebtoken";
import { node } from "../../config";

export const login = async (req: Request, res: Response) => {
    const {
        email,
        password: passwordData,
        refreshToken,
    }: { email: string; password: string; refreshToken: boolean } = req.body;

    // TODO Make call to mongo database to check if user exist.
    let user;
    try {
        user = (await loginUser(email, passwordData)).user;
    } catch (error) {
        errorLog(error, "APP");
        if (error instanceof ApiError) {
            return res
                .status(error.statusCode)
                .json({ message: error.message });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    const { password, ...userWithoutPassword } = user;

    const accessToken = jwt.sign(userWithoutPassword, node.accessTokenSecret!, {
        expiresIn: "30m",
    });

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

    return res.status(200).send("Logged in succesfully");
};
