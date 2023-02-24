import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useEffect, useState} from "react";

const AllUsers = () => {
    const [usersList, setUsersList] = useState([]);
    
    useEffect(() => {
        if (usersList.length === 0) {
            axios.get(`${BASE_URL}/allUsers`)
            .then(res => setUsersList(res.data.result))
            .catch(err => console.log(err));
        }
    }, [usersList]);
    
    const deleteUser = (id) => {
        console.log(id);
        axios.post(`${BASE_URL}/deleteUserById`, {id})
        .then(res => console.log(res))
        .catch(err => console.log(err + " Problème de la fonction delete user by id"));
    };
    
    const refreshPage = () => {
        window.location.reload(false);
  }
 

    
    return(
        <div>
            {usersList.map((userData,i) => {
            console.log(userData)
                return(
                <div key = {i}>
                    <ul>
                        <li>Nom:{userData.nom}</li>
                        <li>Prenom:{userData.prenom}</li>
                        <li>Email:{userData.email}</li>
                        <li>Birthdate:{userData.birthdate}</li>
                        <img src={`${BASE_URL}/img/${userData.avatar}`} alt={`Avatar de ${userData.nom} ${userData.prenom}`} width="100" height="100" margin="2em" padding="2em"/>
                    </ul>
                    <button onClick={() => {deleteUser(userData.id); refreshPage();}}> X </button>
                </div>    
                );
            })}
        </div>
        );
};

export default AllUsers;