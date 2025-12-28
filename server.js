import express from "express";
import productsRoutes from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import basicAuthMiddleware from "./src/middlewares/basicAuth.middleware.js";
const server = express();

// Middleware to parse JSON bodies
server.use(bodyParser.json());
// Handle product routes
server.use("/api/products", basicAuthMiddleware, productsRoutes);
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});

server.listen(3200, () => console.log("Server running on port 3200"));
