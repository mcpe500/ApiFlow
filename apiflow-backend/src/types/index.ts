export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
    refreshToken: string;
}

export class ApiError extends Error {
    private _statusCode: number;
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
