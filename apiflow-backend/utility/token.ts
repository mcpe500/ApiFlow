import jwt from "jsonwebtoken";

export enum Token {
  ACCESS,
  REFRESH,
}

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
