import UserModel from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName, email, password: hashedPassword
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login User
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.SecretKey, { expiresIn: "3d" });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // secure in production
      maxAge: 3 * 24 * 3600 * 1000,  // Cookie expires after 3 days
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: foundUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Logout User
const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Check if User is Logged In
const isLogin = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(200).json({ success: false, message: "User not logged in", isLoggedIn: false });
    }
    res.status(200).json({ success: true, message: "User is logged in", user, isLoggedIn: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", isLoggedIn: false });
  }
};

export { Register, Login, Logout, isLogin };
