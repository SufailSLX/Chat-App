import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ msg: "Email already used" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: true, // You can set false if adding OTP/email-verification later
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar || null,
        isVerified: newUser.isVerified,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || null,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};
