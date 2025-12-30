import ProductModal from "./product.modal.js";

export default class ProductController {
  // Controller methods will be implemented here
  getAllProducts(req, res) {
    res.status(200).json(ProductModal.getAllProducts());
  }
  addProduct(req, res) {
    const { name, price, des, imageUrl, size, category } = req.body;
    const productData = { name, price, des, imageUrl, size, category };
    ProductModal.addProduct(productData);
    res.status(201).json(productData);
  }
  getSingleProduct(req, res) {
    const { id } = req.params;
    const product = ProductModal.getSingleProduct(parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }

  rateProduct(req, res) {
    const { userId, productId, rating } = req.query;
    const isRated = ProductModal.rateProduct(userId, productId, rating);
    if (isRated) {
      res.status(200).json({ message: "Product rated successfully" });
    } else {
      res.status(400).json({ message: "User or product not found" });
    }
  }
  filterProducts(req, res) {
    const { minPrice, maxPrice, category } = req.query;
    const filteredProducts = ProductModal.filterProducts(
      parseFloat(minPrice),
      parseFloat(maxPrice),
      category
    );
    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the criteria" });
    } else {
      return res.status(200).json(filteredProducts);
    }
  }
}
