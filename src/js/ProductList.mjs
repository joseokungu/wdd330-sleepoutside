import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    const list = await this.dataSource.getData();
    this.products = list;
    this.renderList(list);
    this.addSearchListener();
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);

    const noResults = document.querySelector(".no-products");
    if (noResults) {
      noResults.hidden = list.length !== 0;
    }
  }

  addSearchListener() {
    const searchInput = document.querySelector("#product-search");
    if (!searchInput) {
      return;
    }

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim().toLowerCase();
      const filteredProducts = this.products.filter((product) =>
        product.Name.toLowerCase().includes(searchTerm),
      );
      this.renderList(filteredProducts);
    });
  }
}