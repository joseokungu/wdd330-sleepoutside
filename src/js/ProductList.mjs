import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  const finalPrice = Number(product.FinalPrice);
  const suggestedPrice = Number(product.SuggestedRetailPrice);

  const isDiscounted =
    Number.isFinite(finalPrice) &&
    Number.isFinite(suggestedPrice) &&
    suggestedPrice > finalPrice;

  const discountPercent = isDiscounted
    ? Math.round(
        ((suggestedPrice - finalPrice) / suggestedPrice) * 100,
      )
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        ${
          isDiscounted
            ? `<span class="discount-badge">${discountPercent}% OFF</span>
               <p class="product-card__original-price">
                 $${suggestedPrice.toFixed(2)}
               </p>`
            : ""
        }
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${finalPrice.toFixed(2)}</p>
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
    this.renderList(list);

    const title = this.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    document.querySelector(".title").textContent = title;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}