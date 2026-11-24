import { alertMessage, getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(formSelector, cartKey) {
    this.form = document.querySelector(formSelector);
    this.cartKey = cartKey;
    this.cartItems = getLocalStorage(cartKey) || [];
    this.service = new ExternalServices();
  }

  init() {
    this.renderOrderSummary();

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.checkout();
    });

    if (this.cartItems.length === 0) {
      this.form.querySelector('button[type="submit"]').disabled = true;
      alertMessage("Your cart is empty. Add items before checking out.", false);
    }
  }

  renderOrderSummary() {
    const list = document.querySelector(".checkout__items");
    const total = document.querySelector(".checkout__total");
    let orderTotal = 0;

    list.replaceChildren();

    this.cartItems.forEach((item) => {
      const listItem = document.createElement("li");
      const name = document.createElement("span");
      const price = document.createElement("span");
      const itemPrice = Number(item.FinalPrice);

      name.textContent = item.Name;
      price.textContent = `$${itemPrice.toFixed(2)}`;
      listItem.append(name, price);
      list.append(listItem);
      orderTotal += itemPrice;
    });

    total.textContent = `$${orderTotal.toFixed(2)}`;
  }

  packageOrder() {
    const order = Object.fromEntries(new FormData(this.form).entries());
    order.orderDate = new Date().toISOString();
    order.items = this.cartItems;
    return order;
  }

  async checkout() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      await this.service.checkout(this.packageOrder());
      localStorage.removeItem(this.cartKey);
      window.location.assign("./success.html");
    } catch (error) {
      submitButton.disabled = false;
      alertMessage(error?.message ?? error);
    }
  }
}
