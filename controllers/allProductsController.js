import {pool} from "../config/database.js";

export default (req, res) => {
    const sql = "SELECT picture, id, name, description, price, destination FROM products";
    pool.query(sql, (err, result) => {
        if (err) throw err + "Erreur pour afficher de la BDD table Products";
        res.json({result});
    });
};