import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchQuery = getParam("search");

const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");

const myList = new ProductList(
  category,
  dataSource,
  listElement,
  searchQuery,
);

myList.init();