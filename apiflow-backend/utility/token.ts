import jwt from "jsonwebtoken";
import { DateTime } from "luxon";
import { Token, TokenStatus, VerificationStatus } from "../src/types";

/**
 * Generate either access or refresh token
 * @param {any} payload the data that will be encrypted
 * @param {Token} type the type of the token that will be generated
 * @param {number} expiresIn the expiration time in seconds
 * @param {string} tokenSecret is optional and used to define the secret key.
 * @returns {string} the token that is generated
 */
export const generateToken = (
    payload: any,
    type: Token,
    expiresIn: number,
    tokenSecret?: string,
): string => {
    const secret: string =
        tokenSecret ?? process.env[`${Token[type]}_TOKEN_SECRET`]!;
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
    return token;
};

/**
 * Verify a given token string.
 * @param {string} token the token string.
 * @param {Token} type the type of the token that will be used to validate this token string
 * @param {string} tokenSecret is optional and used to defin the secret key.
 */
export const verifyToken = (
    token: string,
    type: Token,
    tokenSecret?: string,
): VerificationStatus => {
    const secret: string =
        tokenSecret ?? process.env[`${Token[type]}_TOKEN_SECRET`]!;
    const result: jwt.JwtPayload = jwt.verify(token, secret, {
        ignoreExpiration: true,
    }) as jwt.JwtPayload;

    const currentDate = DateTime.now().toSeconds();
    // If current date is greater than the token's expiration date meaning that the token must be expired.
    const status: TokenStatus =
        result.exp && currentDate > result.exp
            ? TokenStatus.EXPIRED
            : TokenStatus.VERIFIED;
    return {
        status: status,
        data: result,
    };
};
