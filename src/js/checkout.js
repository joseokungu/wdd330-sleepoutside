
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
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await myCheckout.checkout(event.currentTarget);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  });
