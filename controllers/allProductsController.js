import {pool} from "../config/database.js";

export default (req, res) => {
    const sql = "SELECT picture, id, name, description, price, destination, thematique FROM products";
    pool.query(sql, (err, result) => {
        if (err) throw err + " allProductsController -> Erreur pour afficher bdd_products";
        res.json({result});
    });
};