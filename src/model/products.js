const db = require("../database/db.js");

//Challenge 1

const select_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name,
    quantity_per_unit,
    FORMAT('£%.2f', unit_price) AS unit_price,
    units_in_stock,
    FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value,
    units_on_order
  FROM products
`);

function listProducts() {
  return select_products.all();
}

//Challenge 2

const searchStatement = db.prepare(/*sql*/ `
    SELECT 
        id, 
        name
    FROM products
    WHERE name LIKE ? 
`);

function searchProducts(searchString) {
  const searchQuery = `%${searchString}%`; // Add wildcards for partial matching
  return searchStatement.all(searchQuery);
}

//Challenge 3, 4

const select_product = db.prepare(/*sql*/ `
    SELECT
        products.id,
        products.name,
        categories.name AS category_name,
        categories.description AS category_description
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
`);

function getProduct(id) {
  return select_product.get(id);
}

module.exports = { listProducts, searchProducts, getProduct };
