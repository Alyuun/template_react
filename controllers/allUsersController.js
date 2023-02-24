import {pool} from "../config/database.js"

export default (req, res) => {
    let sql = "SELECT id, nom, prenom, email, birthdate, avatar FROM users";
    pool.query(sql,(err, result) =>{
        if(err) throw err
        res.json({result})
    })
}