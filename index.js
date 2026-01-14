import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import productRoutes from "./src/features/product/routes/product.routes.js";
import userRoutes from "./src/features/user/routes/user.routes.js";
import cartRoutes from "./src/features/cart/routes/cart.route.js";
import cookieParser from "cookie-parser";

import swaggerDocument from "./swagger.json" assert { type: "json" };
import loggerMiddleware, { logger } from "./src/middlewares/log.middleware.js";
import { ApplicationError } from "./src/errorHandler/applicationError.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS policy configuration
const corsOptions = {
  origin: "http://localhost:5500",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: "*",
  credentials: true,
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
// return ok for preflight request.
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(loggerMiddleware);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
app.use("/api/product", productRoutes);
app.use("/api/user", (req, res, next) => userRoutes(req, res, next));
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.status).json({ error: err.message });
  }
  logger.error("Something went wrong", err);
  return res.status(500).json({ error: "Internal Server Error" });
});
//  Middleware to handle 404 requests.
app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. Please check our documentation for more information at localhost:3200/api-docs"
    );
});

export default app;
