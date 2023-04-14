import { asyncQuery } from "../config/database.js";

export default async (req, res) => {
  const { name, description, price, destination } = req.body;

  const sql =
    "SELECT id, picture, name, description, price, destination, thematique FROM products";

  const products = await asyncQuery(sql, []);

  const searchProducts = products.filter((product) => {
    const productNameMatch = product.name
    console.log(productNameMatch)
      .toLowerCase()
      .includes(name.toLowerCase());
    const productDescMatch = product.description
    console.log(productDescMatch)
      .toLowerCase()
      .includes(description.toLowerCase());
    const productPriceMatch = product.price.toString().includes(price);
    console.log(productPriceMatch)
    const productDestMatch = product.destination
    console.log(productDestMatch)
      .toLowerCase()
      .includes(destination.toLowerCase());

    return (
      productNameMatch &&
      productDescMatch &&
      productPriceMatch &&
      productDestMatch
    );
  });

  res.json({ searchProduct: searchProducts });
};
