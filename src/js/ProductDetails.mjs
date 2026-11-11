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

    const image = section.querySelector("img");
    // Only these products have both image sizes available.
    const responsiveProductIds = ["880RR", "985RF", "985PR", "344YJ"];
    if (responsiveProductIds.includes(this.product.Id)) {
      const smallImage = this.product.Image.replace(/~320\.jpg$/i, "~160.jpg");
      image.srcset = `${smallImage} 160w, ${this.product.Image} 320w`;
      image.sizes = "(max-width: 500px) calc(100vw - 2rem), 500px";
    }
    image.src = this.product.Image;
    section.querySelector(".product-card__price").textContent =
      `$${this.product.FinalPrice}`;
    section.querySelector(".product__color").textContent =
      this.product.Colors[0].ColorName;
    section.querySelector(".product__description").innerHTML =
      this.product.DescriptionHtmlSimple;
  }
}
