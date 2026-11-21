import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

    // Animate the backpack icon after adding a product.
    const cartIcon = document.querySelector(".cart svg");

    if (cartIcon) {
      cartIcon.classList.remove("cart-bounce");

      // Force the browser to recalculate the SVG layout.
      void cartIcon.getBoundingClientRect().width;

      // Start the animation again.
      cartIcon.classList.add("cart-bounce");
    }
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
