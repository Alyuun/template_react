import { pool } from "../config/database.js";

export default (req, res) => {
    const {cart_id, product_id} = req.body;
    const sql = "DELETE FROM products_cart wHERE cart_id = ? AND product_id = ?";
    const paramSql = [cart_id, product_id];
    
    pool.query(sql, paramSql,(err, result) => {
        if (err) throw err;
        res.json({result});
    });
};