import User from "../models/usersModel.js";

const signupService = async (userInfo) => {
    const user = await User.create(userInfo)
    return user;

}
const findUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}

export { signupService, findUserByEmail };

