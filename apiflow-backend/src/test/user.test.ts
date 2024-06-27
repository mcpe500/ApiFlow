import "dotenv/config";
import { getUser } from "../service/User";
import UserModel from "../model/User";
import mongoose from "mongoose";
import { loginSchema, registerSchema } from "../validation/user";
import { Token, generateToken } from "../../utility/token";

jest.mock("../model/User");

afterEach(() => {
    jest.clearAllMocks();
});

describe("User service test", () => {
    describe("Get User", () => {
        it("should return null for non-existent user", async () => {
            const email = "nonexistent@example.com";

            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            const user = await getUser(email);
            expect(user).toBeNull();
        });

        it("should called findOne with email as parameter", async () => {
            const email = "test@gmail.com";
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            await getUser(email);
            expect(UserModel.findOne).toHaveBeenCalledWith({ email });
        });

        it("should return the given user", async () => {
            const email = "existed@example.com";
            const _doc = {
                _id: new mongoose.Types.ObjectId(),
                email: email,
                name: "Existed User",
                username: "existed123",
                password: "exiSted1234!",
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(_doc);

            const user = await getUser(email);
            expect(user).toBe(_doc);
        });
    });

    describe("Validation test", () => {
        describe("Login schema", () => {
            it("should failed validation for login schema because of lacking password", () => {
                const inputData = {
                    email: "testuser@gmail.com",
                    rememberMe: true,
                };

                const { success, error, data } =
                    loginSchema.safeParse(inputData);

                expect(success).toBeFalsy();
                expect(error).toBeTruthy();
            });

            it("should failed validation for login schema because of lacking email", () => {
                const inputData = {
                    password: "testuser1234",
                    rememberMe: true,
                };

                const { success, error, data } =
                    loginSchema.safeParse(inputData);
                expect(success).toBeFalsy();
                expect(error).toBeTruthy();
            });

            it("should failed validation for login schema because of lacking rememberMe", () => {
                const inputData = {
                    email: "testuser@gmail.com",
                    password: "testuser1234",
                };

                const { success, error, data } =
                    loginSchema.safeParse(inputData);
                expect(success).toBeFalsy();
                expect(error).toBeTruthy();
            });

            it("should failed validation because of unknown field", () => {
                const inputData = {
                    email: "testuser@gmail.com",
                    password: "testuser1234",
                    unknown: "unknown object",
                };

                const { success, error, data } =
                    loginSchema.safeParse(inputData);

                expect(success).toBeFalsy();
                expect(error).toBeTruthy();
            });

            it("should given validation succcess", () => {
                const inputData = {
                    email: "testuser@gmail.com",
                    password: "testuser1234",
                    rememberMe: true,
                };

                const { success, error, data } =
                    loginSchema.safeParse(inputData);

                expect(success).toBeTruthy();
                expect(error).toBeFalsy();
            });
        });
    });
});

describe("Token generation test", () => {
    describe("Access Token Test", () => {
        it("Should generate an access token", () => {
            const payload = {
                username: "bambang",
                name: "bambang",
            };

            const token = generateToken(payload, Token.ACCESS, 1 * 60);
            expect(token).toBeTruthy();
        });
    });
});
