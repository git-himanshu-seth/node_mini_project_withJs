import jwt from "jsonwebtoken";
const secretKey = "JITcV1LvnRJf3GD6EwkxjbIc4ZKeXoqLrkSWY2gbn8D";
const jwtAuthMiddleware = (req, res, next) => {
  // Get authorization Token
  const authToken = req.headers["authorization"];
  // If no token, return 400
  if (!authToken) {
    return res.status(400).json({ message: "Authorization header missing" });
  }
  try {
    // Remove 'Bearer ' prefix if present
    const token = authToken.replace("Bearer ", "").trim();
    // Verify token
    const decodedAuth = jwt.verify(token, secretKey);
    req.user = decodedAuth;
    next();
  } catch (error) {
    // If token is invalid or expired, return 401
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export default jwtAuthMiddleware;
