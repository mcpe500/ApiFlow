import { getUser } from "../service/User";
import UserModel from "../model/User";

jest.mock("../model/User");

describe("User service test", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

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
});
