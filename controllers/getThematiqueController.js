import { pool } from "../config/database.js";

export default async (req, res) => {
    const sql = "SELECT DISTINCT thematique FROM products";
    pool.query(sql, (err, result) => {
        if (err) throw err + " getThematiqueController -> Erreur pour afficher bdd_products"
        res.json({result});
    })
}