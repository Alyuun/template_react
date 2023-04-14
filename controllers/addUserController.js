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
    const defaultAvatar = "avatar_default.jpg";
    const sql = "INSERT INTO users (role_id, nom, prenom, email, password, birthdate, avatar) VALUES (2, ?, ?, ?, ?, ?, ?)";
    const sqlCart = "INSERT INTO cart (user_id) VALUES (?)";
    
    const {nom, prenom, email, password, birthdate} = req.body;
    const mpdHash = await bcrypt.hash(password,saltRounds);
    let avatar = defaultAvatar;
    if(req.body.files){
        avatar = req.body.files;
    }
    const paramsSql = [nom, prenom, email, mpdHash, birthdate, avatar];
    
    const emailPresent = await emailExist(email);
    
    if(password.length <= 5){
        return res.json({response:'mot de passe trop court, 5 caractères minimum !'});
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
