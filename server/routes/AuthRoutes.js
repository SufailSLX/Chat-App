import express from "express";
import { signup, login, getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info",verifyToken, getUserInfo )
export default authRoutes;