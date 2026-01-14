// import { ApplicationError } from "../../../errorHandler/applicationError.js";
import { productModal } from "../model/product.model.js";
import { productRepository } from "../repository/product.repository.js";

export class productController {
  constructor() {
    this.productRepository = new productRepository();
  }
  addProduct = async (req, res) => {
    const { name, desc, price, size, category } = req.body;
    const newProduct = new productModal(name, desc, price, size, category);
    const product = await this.productRepository.addProducts(newProduct);
    if (product) res.status(201).send("Product added successfully.");
  };
  getAllProducts = async (req, res) => {
    console.log("req.userId :", req?.userId);
    const products = await this.productRepository.getAllProducts();
    return res.status(200).json({ success: true, products });
  };
  getOneProduct = async (req, res) => {
    const { id } = req.params;
    const product = await this.productRepository.getOneProduct(id);
    res.status(200).json({ status: true, product: product });
  };

  // rateProduct = (req, res) => {
  //   const { userId, productId, rating } = req.query;
  // };
}
