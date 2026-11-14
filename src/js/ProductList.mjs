function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
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
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    const title = this.category
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    document.querySelector(".product-listing-title").textContent =
      `Top Products: ${title}`;
    this.renderList(list);
  }

  renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.innerHTML = htmlStrings.join("");
  }

}