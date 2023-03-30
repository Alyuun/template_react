import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {StoreContext} from "../tools/context.js";



const AllUsers = () => {
    const [searchValue, setSearchValue] = useState("");    
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const [isValidated, setIsValidated] = useState(false);
    const [state, dispatch] = useContext(StoreContext);
    
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
        .then(res => {
            console.log(res);
            setUsersList(usersList.filter((e) => e.id !== id));
        })
        .catch(err => console.log(err + " Problème de la fonction delete user by id"));
    };

    const handleSubmit = (e,id) => {
        e.preventDefault();
        navigate(`/updateUser/${id}`);
    };
    
    const submit = (e,id) => {
        e.preventDefault();
        
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        
        console.log(id);
        
        dataFile.append('id', id);
        dataFile.append('files', files[0], files[0].name);
        
        
        axios.post(`${BASE_URL}/updateAvatarById`, dataFile)
            .then(res => {
                const data = [...usersList];
                data.map(e => {
                    if(e.id == id){
                        return e.avatar = res.data.files;
                    }
                });
                setUsersList(data);
                setIsValidated(true);
            })
            .catch(err => console.log(err + " Catch err du submit"));
    };
    
  const productsFilter = usersList.filter((product) =>
    product.nom.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };    

    
    return(
        <div>
            <input placeholder="Recherchez votre destination...." value={searchValue} onChange={handleInputChange} />
            {productsFilter.map((userData,i) => {
                return(
                <div key = {i}>
                
                          
                        <img src={`${BASE_URL}/img/${userData.avatar}`} alt={`Avatar de ${userData.nom} ${userData.prenom}`} width="100" height="100" margin="2em" padding="2em"/>
                        <form onSubmit = {(e) => submit(e, userData.id)} encType = "multipart/form-data">
                            <input type = "file" name = "avatar" />
                            <input type = "submit" className="myButton"  value = "changer d'avatar" />
                        </form>
                    <ul>
                        <li>Nom:{userData.nom}</li>
                        <li>Prenom:{userData.prenom}</li>
                        <li>Email:{userData.email}</li>
                        <li>Birthdate:{userData.birthdate}</li>
                    </ul>
                    
                    <button className="myButton" onClick={(e) => handleSubmit(e,userData.id)}> Modifier les informations</button>
                    <button className="myButton"  onClick={() => {deleteUser(userData.id) }}> Supprimer l'utilisateur </button>
                    
                    
                </div>    
                );
            })}
        </div>
        );
};

export default AllUsers;

