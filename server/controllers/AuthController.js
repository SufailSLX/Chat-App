import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Token expiry: 3 days
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge / 1000, // in seconds
  });
  console.log("[JWT CREATED]", email);
  return token;
};

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("[SIGNUP ATTEMPT]", email);

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("[SIGNUP FAILED] Email already exists:", email);
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    // const user = await User.create({ email, password });

    const token = createToken(email, user._id);
    res.cookie("JWT", token, {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    console.log("[SIGNUP SUCCESS]", user.email);

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error("[SIGNUP ERROR]", error);
    return res.status(500).send("Internal Server Error");
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("[LOGIN ATTEMPT]", email);

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("[LOGIN FAILED] User not found:", email);
      return res.status(404).send("User not found");
    }

    console.log("[LOGIN DEBUG] Password entered:", password);
    console.log("[LOGIN DEBUG] Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("[LOGIN DEBUG] isMatch =", isMatch);

    if (!isMatch) {
      console.log("[LOGIN FAILED] Password incorrect for:", email);
      return res.status(400).send("Password is incorrect");
    }

    const token = createToken(email, user._id);
    res.cookie("JWT", token, {
      maxAge,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    console.log("[LOGIN SUCCESS]", user.email);

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(res.userId);
    if (!userData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return res.status(500).send("Internal Server Error");
  }
};
