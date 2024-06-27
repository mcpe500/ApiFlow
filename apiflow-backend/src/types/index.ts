import { JwtPayload } from "jsonwebtoken";
export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    refreshToken: string | undefined;
}

export class ApiError extends Error {
    private _statusCode: number;

    /**
     * Initialize an ApiError with message and status code
     * @param {string} message the error message to be given
     * @param {number} statusCode the error status code.
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this._statusCode = statusCode;
    }

    public get statusCode(): number {
        return this._statusCode;
    }

    public set statusCode(statusCode: number) {
        this._statusCode = statusCode;
    }
}

export interface VerificationStatus {
    status: TokenStatus;
    data: JwtPayload;
}

export enum Token {
    ACCESS,
    REFRESH,
}

export enum TokenStatus {
    EXPIRED,
    VERIFIED,
}
