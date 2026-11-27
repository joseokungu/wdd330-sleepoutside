import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement, searchQuery) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery;
  }
  async init() {
    let list;
    let title;

    if (this.searchQuery) {
      list = await this.dataSource.searchProducts(this.searchQuery);
      title = `Search Results for "${this.searchQuery}"`;
    } else {
      list = await this.dataSource.getData(this.category);

      title = this.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    this.renderList(list);
    document.querySelector(".title").textContent = title;
  }
    renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
