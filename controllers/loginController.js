import {asyncQuery} from "../config/database.js";
import bcrypt from "bcrypt";
import {generateToken} from "../config/token.js";


const generateResponse = async (userDataSQL) => {
    console.log(userDataSQL);
    // ID du role Admin en BDD
    const ADMIN_ROLE_ID = 1;
    // verrifie si le user est admin return true OR false
    const admin = userDataSQL.role_id === ADMIN_ROLE_ID;
    
    const userData = { 
        id:userDataSQL.id,
        nom:userDataSQL.nom,
        prenom:userDataSQL.prenom,
        email:userDataSQL.email,
        cart_id:userDataSQL.cart_id,
        user:true,
        admin
    };
    try {
        const token = await generateToken(userData);
        return {
            response:true,
            admin,
            token,
            id:userDataSQL.id,
            cart_id:userDataSQL.cart_id
        };
    } catch(err){
        console.log(err + "Voici le catch du try token login controller");
        return;
    }
};

export default async (req, res) => {
    const {password, email} = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    const paramsSql = [email];

    try {
        // recupere les info user de la table user
        const result = await asyncQuery(sql, paramsSql);
        if(result.length === 0){
            return res.status(401).json({error:'identifiant ou mdp incorrect'})
        }
        
        // recupere l'id du panier
        const sqlId = "SELECT id FROM cart WHERE user_id = ?";
        const userCart = await asyncQuery(sqlId,[result[0].id]);
        
        console.log(userCart);
        
        // on fusionne les info user avec l'id du panier pour en faire un seul objet 
        const userData = {cart_id:userCart[0].id, ...result[0]};
        
        const response = await generateResponse(userData);
        const resultCompare = await bcrypt.compare(password, result[0].password);
        console.log(response);
        res.json(resultCompare ? {response} : {response:null});
    } catch(err){
        console.log(err + " => Voici le catch de connexion bcrypt compare du logincontroller");
        res.sendStatus(500);
    }
};