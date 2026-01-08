import { ApplicationError } from "../../../errorHandler/applicationError.js";
import { fetchAllProducts, rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};
export const rateProduct = (req, res, next) => {
  const { userId, productId, rating } = req.query;
  if (rating < 0 || rating > 5) {
    throw new ApplicationError("rating should be b/w 0 and 5", 401);
  }
  const modelResp = rateProductModel(productId, userId, rating);
  if (modelResp.status) res.json({ success: true, product: modelResp.res });
  else res.status(401).json({ success: false, msg: modelResp.res });
};
