import jwt from "jsonwebtoken";

export enum Token {
    ACCESS,
    REFRESH,
}

export const generateToken = (payload: any, type: Token, expiresIn: number) => {
    const secret: string = process.env[`${Token[type]}_TOKEN_SECRET`]!;
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
    return token;
};
