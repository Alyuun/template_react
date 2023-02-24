import {pool} from "../config/database.js";
import {useState} from "react";

export default (req, res) => {
    
    const {product_id, cart_id} = req.body;  
    const paramSql = [product_id, cart_id];
    
    let sql = "INSERT INTO products_cart (product_id, cart_id) VALUES (?, ?)";
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err + " erreur pour injecter dans la BDD table product_cart";
        res.json({result});
    });
};

