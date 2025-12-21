const jwt=require("jsonwebtoken");
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

module.exports = protectRoute;
