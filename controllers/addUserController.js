import {asyncQuery} from "../config/database.js";
import bcrypt from 'bcrypt';

const emailExist  = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const response  = await asyncQuery(sql,[email]);
    if(response.length > 0) return true;
    return false;
};

export default async (req, res) => {
    const saltRounds = 10;
    //const avatar = "avatar_default.jpg"
    const sql = "INSERT INTO users (role_id, nom, prenom, email, password, birthdate, avatar) VALUES (2, ?, ?, ?, ?, ?, ?)";
    const sqlCart = "INSERT INTO cart (user_id) VALUES (?)";
    
    const {nom, prenom, email, password, birthdate, files} = req.body;
    //console.log({});
    
    const mpdHash = await bcrypt.hash(password,saltRounds);
    const paramsSql = [nom, prenom, email, mpdHash, birthdate, files];
    
    const emailPresent = await emailExist(email);
    
    if(password.length <= 8){
        return res.json({response:'mot de passe trop court'});
    }
    
    if(emailPresent) {
        return res.json({response:'email déjà présent'});
    }
    
    
    try {
        const createUser  = await asyncQuery(sql,paramsSql);
        
        const createCart  = await asyncQuery(sqlCart,[createUser.insertId]);
        
        res.json({response:createUser,createCart});
    }catch(err){
        res.json({response:'error'});
        console.log(err);
    }
};