import {pool} from "../config/database.js";

export default (req, res) => {
    const sql = "INSERT INTO products (avatar, name, description, price, destination) VALUES (?, ?, ?, ?, ?)";
    const {files, name, description, price, destination} = req.body;
    const paramSql = [files, name, description, price, destination];
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err + " Erreur pour injecter dans la BDD table Products";
        res.json({result});
    });
};