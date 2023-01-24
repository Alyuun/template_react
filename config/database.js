import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "", // identifiant BDD
    password: "", // le password
    database: "", // nom de la base de donnée
});