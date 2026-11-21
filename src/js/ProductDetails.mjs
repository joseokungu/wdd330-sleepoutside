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
  }

  renderProductDetails() {
    const section = document.querySelector("#product-detail");
    section.querySelector("h3").textContent = this.product.Brand.Name;
    section.querySelector("h2").textContent = this.product.NameWithoutBrand;
    section.querySelector("img").src = this.product.Image;
    const priceElement = section.querySelector(".product-card__price");

    priceElement.textContent = `$${this.product.FinalPrice}`;

    const originalPrice = this.product.SuggestedRetailPrice;
    const finalPrice = this.product.FinalPrice;

    if (originalPrice > finalPrice && originalPrice > 0) {
      const discountPercentage = Math.round(
        ((originalPrice - finalPrice) / originalPrice) * 100,
      );

      const discountBadge = document.createElement("span");
      discountBadge.classList.add("product-card__discount");
      discountBadge.textContent = `${discountPercentage}% OFF`;

      priceElement.insertAdjacentElement("afterend", discountBadge);
    }
    section.querySelector(".product__color").textContent =
      this.product.Colors[0].ColorName;
    section.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;
  }
}
