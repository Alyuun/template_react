import { asyncQuery } from "../config/database.js";

export default async (req, res) => {
    const sql = "INSERT INTO messages (title, name, message, mail) VALUES (?, ?, ?, ?)";
    const {title, name, message, mail} = req.body;
    const paramSql = [title, name, message, mail];
    
    try {
        const addMessage = await asyncQuery(sql, paramSql);
        res.json({addMessage});
    } catch (err) {
        console.log(err + " contactController, catch err insertion table messages");
/*        res.sendStatus(500);
*/    }
};