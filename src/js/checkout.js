
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");

myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("input", () => myCheckout.calculateOrderTotal());

document
  .querySelector("#checkout-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    myCheckout.checkout(event.currentTarget);
  });
