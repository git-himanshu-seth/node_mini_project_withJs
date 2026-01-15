// import { ApplicationError } from "../../../errorHandler/applicationError.js";
import { productModal, rateProductModel } from "./model.js";
import { productRepository } from "./repository.js";

export class productController {
  constructor() {
    this.productRepository = new productRepository();
  }
  addProduct = async (req, res) => {
    try {
      const { name, desc, price, size, category } = req.body;
      const newProduct = new productModal(name, desc, price, size, category);
      const product = await this.productRepository.addProducts(newProduct);
      if (product) res.status(201).send("Product added successfully.");
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  };
  getAllProducts = async (req, res) => {
    try {
      console.log("req.userId :", req?.userId);
      const products = await this.productRepository.getAllProducts();
      return res.status(200).json({ success: true, products });
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  };
  getOneProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await this.productRepository.getOneProduct(id);
      res.status(200).json({ status: true, product: product });
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  };

  filterProducts = async (req, res) => {
    try {
      const { category, desc, maxPrice, minPrice } = req.query;
      console.log("Filter Values:", category, desc, maxPrice, minPrice);
      const products = await this.productRepository.filterProducts(req.query);
      return res.status(200).json({ status: "success", products });
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  };

  rateProduct = async (req, res) => {
    try {
      const { productId, rating } = req.body;
      const userId = req.userId;
      const ratingObj = new rateProductModel(productId, userId, rating);
      await this.productRepository.rateProduct(ratingObj);
      res.status(201).send("Rating added successfully.");
    } catch (err) {
      return res.status(200).send("Something went wrong");
    }
  };

  async averagePrice(req, res, next) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
