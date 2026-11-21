
import {
  alertMessage,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", () => this.addProductToCart());
  }

  
addProductToCart() {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(this.product);
  setLocalStorage("so-cart", cart);

  alertMessage(`${this.product.Name} was added to your cart.`, false);
}


  renderProductDetails() {
    const section = document.querySelector("#product-detail");
    section.querySelector("h3").textContent = this.product.Brand.Name;
    section.querySelector("h2").textContent = this.product.NameWithoutBrand;

   const image = section.querySelector("img");

image.src =
  this.product.Images.PrimaryLarge ||
  this.product.Images.PrimaryExtraLarge ||
  this.product.Images.PrimaryMedium;

image.alt = this.product.NameWithoutBrand;
  }
}
