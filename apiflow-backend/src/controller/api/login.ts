import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    // TODO Make call to mongo database to check if user exist.

    // TODO Return the result
    return res.status(200).send("Posting on /api/auth/login");
};
