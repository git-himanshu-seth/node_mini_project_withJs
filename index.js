import express from "express";
import swagger from "swagger-ui-express";
import productRoutes from "./src/features/product/routes/product.routes.js";
import userRoutes from "./src/features/user/routes/user.routes.js";
import cartRoutes from "./src/features/cart/routes/cart.route.js";
import cookieParser from "cookie-parser";

import swaggerDocument from "./swagger.json" assert { type: "json" };
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

export default app;
