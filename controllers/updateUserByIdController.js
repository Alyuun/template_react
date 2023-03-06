import { pool } from "../config/database.js";

export default (req, res) => {
    const {id, nom, prenom, email, birthdate} = req.body;
    console.log({id, nom, prenom, email, birthdate})
    const sql = "UPDATE users SET nom = ?, prenom = ?, email = ?, birthdate = ? WHERE id = ?";
    
    const paramSql = [nom, prenom, email, birthdate, id];
    
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err;
        res.json({result});
    });
};