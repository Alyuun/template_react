import {pool} from "../config/database.js";

export default (req, res) => {
    const sql = "INSERT INTO products (picture, name, description, price, destination, thematique) VALUES (?, ?, ?, ?, ?, ?)";
    const {files, name, description, price, destination, thematique} = req.body;
    const paramSql = [files, name, description, price, destination, thematique];
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err + " Erreur pour injecter dans la BDD table Products";
        res.json({result});
    });
};