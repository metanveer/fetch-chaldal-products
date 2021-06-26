import fs from "fs";
import fetch from "node-fetch";
import { saveFile } from "./helpers.js";

let rawdata = fs.readFileSync("chaldalCategories.json");
let categoriesData = JSON.parse(rawdata);

function getCategoryName(catId) {
  return categoriesData.find((item) => item.Id === catId).Name;
}

async function getProductsByCatId(categoryId) {
  const apiV1 = "https://eggyolk.chaldal.com/api";
  const apiV4 = "https://chaldal.com/yolk/api-v4";

  const api = `${apiV1}/Product/GetProductsForCategory?categoryId=${categoryId}&pageIndex=0&pageSize=100`;

  const res = await fetch(api);
  const data = await res.json();

  const products = data.Products;
  console.log(
    `Got ${products.length} products for category  "${getCategoryName(
      categoryId
    )}"`
  );
  return products;
}

async function getAndSaveProductsByCatId(catId) {
  const products = await getProductsByCatId(catId);
  try {
    saveFile(products, `__data__${getCategoryName(catId)}_products`);
    console.log(`Saved as "${getCategoryName(catId)}_products.json"`);
  } catch (error) {
    console.log("ERROR: failed to save", error);
  }
}

categoriesData
  .filter((item) => item.ContainsProducts === true)
  .forEach(async (item) => {
    await getAndSaveProductsByCatId(item.Id);
  });
