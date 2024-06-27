import jwt from "jsonwebtoken";
import luxon from "luxon";
import { Token, TokenStatus, VerificationStatus } from "../src/types";

/**
 * Generate either access or refresh token
 * @param {any} payload the data that will be encrypted
 * @param {Token} type the type of the token that will be generated
 * @param {number} expiresIn the expiration time in seconds
 * @returns {string} the token that is generated
 */
export const generateToken = (
    payload: any,
    type: Token,
    expiresIn: number,
): string => {
    const secret: string = process.env[`${Token[type]}_TOKEN_SECRET`]!;
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
    return token;
};

export const verifyToken = (token: string, type: Token): VerificationStatus => {
    const secret: string = process.env[`${Token[type]}_TOKEN_SECRET`]!;

    const result: jwt.JwtPayload = jwt.verify(token, secret, {
        ignoreExpiration: true,
    }) as jwt.JwtPayload;

    const currentDate = luxon.DateTime.now().toSeconds();
    // If current date is greater than the token's expiration date meaning that the token must be expired.
    console.log(currentDate);
    console.log(result);
    const status: TokenStatus =
        result.exp && currentDate > result.exp
            ? TokenStatus.EXPIRED
            : TokenStatus.VERIFIED;
    return {
        status: status,
        data: result,
    };
};
