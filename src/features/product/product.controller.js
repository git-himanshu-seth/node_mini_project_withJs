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
    console.log(id);
    const product = ProductModal.getSingleProduct(parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }

  rateProduct(req, res) {}
  filterProducts(req, res) {
    console.log(req.query);
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
