const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Email or Password is missing",
        error: "Bad Request",
      });
    }
    console.log(password);
    const existingUser = await userModel
      .findOne({
        email,
      })
      .select("+password");
      console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
        error: "Bad Request",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong Creditails",
        error: "Bad Request",
      });
    }
    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: "Internal Server Error",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, name, password, age, dob, role = "user" } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "some field missing",
        error: "Bad Request",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        error: "Bad Request",
      });
    }
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password,
      age,
      dob,
      role,
    });
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    const userData = newUser.toObject();
    delete userData.password;
    return res.status(200).json({
      success: true,
      message: "Signup Successful",
      token,
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: "Internal Server Error",
    });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
