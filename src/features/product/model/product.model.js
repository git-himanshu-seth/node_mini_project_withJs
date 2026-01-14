export class rateProductModel {
  constructor(productId, userId, rating) {
    this.productId = productId;
    this.userId = userId;
    this.rating = rating;
  }
}

export class productModal {
  constructor(name, desc, price, size, category) {
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.size = size;
    this.category = category;
  }
}
