import { findUserByEmail, signupService } from "../services/userService.js";
import { sendMailWIthEmail } from "../utils/email.js";
import { generateToken } from "../utils/token.js";
import AppError from './../utils/appError.js';


const signUp = async (req, res, next) => {
  try {
    const user = await signupService(req.body);

    const mailData = {
      to: user.email,
      subject: "Verify your account",
      text: "Thank You"
    }

    sendMailWIthEmail(mailData)

    res.status(201).json({
      status: "success",
      message: "Successfully signed up"
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. If not user send res
 * 4. compare password
 * 5. If password not correct send res
 * 6. Check if user is active
 * 7. If not active send res
 * 8. Generate token
 * 9. send user and token
*/

const login = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credentials"
      })
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found. Please create an account"
      })
    }

    const isPasswordValid = user.comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "Password is not correct"
      })
    }

    if (user.status !== "active") {
      return res.status(401).json({
        status: "fail",
        message: "Your account is not activated"
      })

    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(201).json({
      status: "success",
      data: {
        user: others,
        token
      }
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

};


const getMe = async (req, res, next) => {
  try {

    const user = await findUserByEmail(req.user?.email)
    res.status(200).json({
      status: 'success',
      data: user
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

}


export { signUp, login, getMe };

