import {pool} from "../config/database.js";
import {useState} from "react";

export default (req, res) => {
  const { product_id, cart_id } = req.body;
  const paramsSql = [];
  let sql = "INSERT INTO products_cart (product_id, cart_id) VALUES ";
  for (let i = 0; i < product_id.length; i++) {
    sql += "(?, ?), ";
    paramsSql.push(product_id[i], cart_id);
  }
  sql = sql.slice(0, -2); // enlever la dernière virgule
  pool.query(sql, paramsSql, (err, result) => {
    if (err) throw err + " addCartController.js erreur pour injecter dans la BDD table product_cart";
    res.json({ result });
  });
};