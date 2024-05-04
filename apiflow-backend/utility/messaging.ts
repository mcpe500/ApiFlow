import { ApiError } from "../src/types";

export const sendApiError = (error: ApiError, res: any) => {
    return res.status(error.statusCode).json({ message: error.message });
};
