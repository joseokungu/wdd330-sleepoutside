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

    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", this.addToCart.bind(this));
    }
  }

  addToCart() {
    const cartItems = Array.isArray(getLocalStorage("so-cart"))
      ? getLocalStorage("so-cart")
      : [];

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  addProductToCart() {
    this.addToCart();
  }

  renderProductDetails() {
    const productDetail = document.querySelector(".product-detail");

    if (!productDetail) {
      return;
    }

    if (!this.product) {
      productDetail.innerHTML = "<p>Product not found.</p>";
      return;
    }

    const colorName =
      this.product.Colors && this.product.Colors.length > 0
        ? this.product.Colors[0].ColorName
        : "Standard";

    productDetail.innerHTML = `
      <h3>${this.product.Brand ? this.product.Brand.Name : ""}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${colorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}
