export default class ProductModal {
  constructor(id, name, price, des, imageUrl, size, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.des = des;
    this.imageUrl = imageUrl;
    this.size = size;
    this.category = category;
  }
  static addProduct(product) {
    const productId = products.length + 1;
    products.push({ id: productId, product });
    return product;
  }
  static getAllProducts() {
    return products;
  }

  static getSingleProduct(id) {
    const product = products.find((product) => product.id === id);
    return product;
  }
  static filterProducts(minPrice, maxPrice, category) {
    const filteredProducts = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
      );
    });
    console.log("FILTERED PRODUCTS: ", filteredProducts);
    return filteredProducts;
  }
}

const products = [
  new ProductModal(
    1,
    "Cotton T-Shirt",
    299,
    "Soft and breathable cotton T-shirt perfect for daily wear.",
    "https://m.media-amazon.com/images/I/51OzKuZk0iL._SY741_.jpg",
    ["M", "L", "XL"],
    "Clothing"
  ),
  new ProductModal(
    2,
    "Running",
    1499,
    "Running shoes with excellent cushioning.",
    "https://www.campusshoes.com/cdn/shop/files/VESPER_VESPER_WHT-NAVY_07.webp?v=1758174770",
    "9",
    ["M", "L", "XL"],
    "Foot wear"
  ),

  new ProductModal(
    3,
    "Leather Wallet",
    499,
    "Premium-quality leather wallet with multiple compartments.",
    "https://www.theblackcanvas.in/cdn/shop/files/honey-tan-classic-bifold-coin-pocket-wallet.jpg?v=1730911868&width=3000",
    "Standard",
    "Accessories"
  ),

  new ProductModal(
    4,
    "Sports Watch",
    1999,
    "Water-resistant sports watch with heart-rate tracking.",
    "https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2025/01/top-sport-watch-collections-motor-racing-diving-sports-athletes-integrated-bracelet-iconic-watches-special-2-1536x592.jpg",
    "Free Size",
    "Electronics"
  ),

  new ProductModal(
    5,
    "Denim Jeans",
    899,
    "Stretchable denim jeans offering perfect comfort and fit.",
    "https://m.media-amazon.com/images/I/613sNBtfpPL._SX679_.jpg",
    "32",
    "Clothing"
  ),
];
