import { UserModal } from "../features/user/user.modal.js";

const basicAuthMiddleware = (req, res, next) => {
  // Get authorization header
  const authHeader = req.headers["authorization"];
  console.log("authHeader:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  // Decode base64 credentials
  const base64Credentials = authHeader.replace("Basic ", "").trim();
  console.log("base64Credentials:", base64Credentials);
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  console.log("credentials:", credentials);
  const [email, password] = credentials.split(":");

  const user = UserModal.getAllUsers().find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Attach user to request object
  next();
};

export default basicAuthMiddleware;
