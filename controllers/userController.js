import { signupService } from "../services/userService.js";
import AppError from './../utils/appError.js';


//Sign up user
const signUp = async (req, res, next) => {

  try {
    const user = await signupService(req.body);
    res.status(201).json({
      status: "success",
      message: "Successfully signed up"
    })

  } catch (error) {
    next(new AppError(error, 500))
  }

};



export { signUp };

