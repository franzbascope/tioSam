const productsMock = require("../utils/mocks/products");

class ProductsService {
  constructor() {}

  get({ tags }) {
    return Promise.resolve(productsMock);
  }
  edit({ productId }) {
    return Promise.resolve(productsMock[0]);
  }
  store({ product }) {
    return Promise.resolve(productsMock[0]);
  }
  update({ productId, product }) {
    return Promise.resolve(productsMock[0]);
  }
  delete({ productId }) {
    return Promise.resolve(productsMock[0]);
  }
}

module.exports = ProductsService;
