import { pool, asyncQuery } from "../config/database.js";
import { useState } from "react";
import bcrypt from "bcrypt";

const emailExist  = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const response  = await asyncQuery(sql,[email]);
    if(response.length > 0) return true;
    return false;
};

export default async (req, res) => {
    const saltRounds = 10;
    const {id, role_id, nom, prenom, email, password, birthdate, files} = req.body;
    const mpdHash = await bcrypt.hash(password, saltRounds);
    const paramSql = [nom, prenom, email, password, birthdate, files];
    const emailPresent = await emailExist(email);
    const sql = "UPDATE users SET id = ?, role_id = ?, nom = ?, prenom = ?, password = ?, birthdate = ?, files = ? WHERE id = ?";
    
    pool.query(sql, paramSql, (err, result) => {
        if (err) throw err + " erreur pour modifier dans la table users ";
        res.json({result});
    });
};