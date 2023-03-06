import { pool } from "../config/database.js";

export default (req, res) => {
    const {id, files} = req.body;
    console.log({id, files})
    const sql = "UPDATE users SET avatar = ? WHERE id = ?";
    const paramSql = [files, id];
    
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err;
    console.log(result)
        res.json({result, files});
    });
};