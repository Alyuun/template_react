import mysql from "mysql";

export let pool = mysql.createPool({
    connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "alizebernardeau", // identifiant BDD
    password: "bd47b11d8bbec14b24d22d9bf5819567", // le password
    database: "alizebernardeau_travelia", // nom de la base de donnée
});

// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params = []) => {
    return new Promise((resolve, reject)=>{
        pool.query(sql,params, (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}