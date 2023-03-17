import express from "express";
import { getMe, login, signUp } from "../controllers/userController.js";
import VerifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", VerifyToken, getMe)

export default router;
