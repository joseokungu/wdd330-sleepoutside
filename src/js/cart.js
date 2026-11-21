
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is currently empty.</p>";
  } else {
    productList.innerHTML = cartItems.map(cartItemTemplate).join("");
  }

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );

  document.querySelector("#cart-total").textContent =
    `$${total.toFixed(2)}`;

  if (cartItems.length === 0) {
    document.querySelector("#checkout-link").hidden = true;
  }
}

function cartItemTemplate(item) {
  const image =
    item.Images?.PrimaryLarge ||
    item.Images?.PrimaryExtraLarge ||
    item.Images?.PrimaryMedium ||
    "";

  const color = item.Colors?.[0]?.ColorName || "Default";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${item.Name}" />
    </a>
    <div>
      <h2 class="card__name">${item.Name}</h2>
      <p class="cart-card__color">${color}</p>
    </div>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
  </li>`;
}

renderCartContents();
loadHeaderFooter();
