import {pool} from "../config/database.js"
import bcrypt from "bcrypt"

export default (req, res) => {
    const {password, email} = req.body
    const sql = "SELECT password FROM users WHERE email = ?"
    const paramSql = [email]
    
    pool.query(sql, paramSql, async (err, result) => {
        if(err) throw err
        
        try{
            const resultCompare = await bcrypt.compare(password, result[0].password)
            res.json({result:resultCompare})
        } catch(err) {
            console.log(err)    
        }
    })
}