import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Load the shared header and footer
loadHeaderFooter();

// Read the category from the URL
const category = getParam("category");

const categoryTitle = category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

document.querySelector(".products h2").textContent =
  `Top Products: ${categoryTitle}`;

// Create the data source
const dataSource = new ProductData();

// Find the product list element
const listElement = document.querySelector(".product-list");

// Create the product list
const productList = new ProductList(category, dataSource, listElement);

// Retrieve and display products
productList.init();
