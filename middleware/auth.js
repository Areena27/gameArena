const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Not Found",
        error: "Unauthorized",
      });
    }
    console.log("token", token);
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
      error: "Unauthorized",
    });
  }
};
const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    const user = await userModel.findById(req.user).select("role");
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route",
        error: "Forbidden",
      });
    }
    next();
  };
};
module.exports = { protectRoute, authorizeRoles };
