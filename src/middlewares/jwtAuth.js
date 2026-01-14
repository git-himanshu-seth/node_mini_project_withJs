import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, "149336e1b8f56ea04cf10bca3af5e72d", (err, decoded) => {
    if (err) res.status(401).json({ success: false, msg: "login to continue" });
    else {
      const userPayload = decoded;
      req.userId = userPayload.userId;
      next();
    }
  });
};

export default jwtAuth;
