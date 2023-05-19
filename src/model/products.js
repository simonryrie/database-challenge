const db = require("../database/db.js");

const select_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name,
    quantity_per_unit,
    unit_price,
    units_in_stock,
    units_on_order
  FROM products
`);

function listProducts() {
  return select_products.all();
}

module.exports = { listProducts };
