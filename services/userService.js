import User from "../models/usersModel.js";

const signupService = async (userInfo) => {
    const user = await User.create(userInfo)
    return user;

}

export { signupService };

