import { pool } from "../config/database.js";

export default (req, res) => {
    const {id, name, description, price, destination, thematique} = req.body;
    const sql = "UPDATE products SET name = ?, description = ?, price = ?, destination =?, thematique = ? WHERE id = ?";
    const paramSql =  [name, description, price, destination, thematique, id];
    
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err;
        res.json({result});
    });
};