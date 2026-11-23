import { alertMessage, getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: Number(item.FinalPrice),
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.dataSource = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (total, item) => total + Number(item.FinalPrice),
      0,
    );

    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    const itemCount = document.querySelector(
      `${this.outputSelector} #item-count`,
    );

    subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    itemCount.textContent = this.list.length;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length ? 10 + (this.list.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(
      `${this.outputSelector} #order-total`,
    );

    tax.textContent = `$${this.tax.toFixed(2)}`;
    shipping.textContent = `$${this.shipping.toFixed(2)}`;
    orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // Remove error messages from previous checkout attempts.
    document.querySelectorAll("main .alert").forEach((alert) => alert.remove());

    try {
      const order = formDataToJSON(form);

      order.orderDate = new Date().toISOString();
      order.orderTotal = this.orderTotal.toFixed(2);
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);
      order.items = packageItems(this.list);

      await this.dataSource.checkout(order);

      localStorage.removeItem(this.key);
      window.location.href = "/checkout/success.html";
    } catch (err) {
      const serverMessage = err?.message ?? err;
      const message =
        typeof serverMessage === "string"
          ? serverMessage
          : serverMessage?.message || JSON.stringify(serverMessage);

      alertMessage(
        message ||
          "Your order could not be placed. Please check your details and try again.",
      );
    }
  }
}
