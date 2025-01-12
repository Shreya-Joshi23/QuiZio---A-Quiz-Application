import jwt from "jsonwebtoken";

const usermiddleware = async (req, res, next) => {
  try {
    let token = req.headers["Authorization"]?.split(" ")[1];
    if (!token) token = req.cookies?.token;
    console.log("Token",req.headers.cookie.substring(6))
    console.log("Cookie token",req.cookies.token)
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }
    console.log(token);
    const jwtSecret = process.env.JWT_USER_PASSWORD;
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    req.userId = decoded.id;
    console.log(req.userId)
    next();
  } catch (error) {
    res.status(400).json({
      message: "error while verifying token",
      error: error.message,
    });
  }
};

export default usermiddleware;
