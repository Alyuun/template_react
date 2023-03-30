import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {StoreContext} from "../tools/context.js";


const UpdateUser = () => {
    const [user, setUser] = useState(null);
    const [state, dispatch] = useContext(StoreContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [isValidated, setIsValidated] = useState(false);
    
    // Vérifie que c'est le bon user qui veut update le profil, sinon on redirige
    useEffect(()=> {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res => {
                console.log(res);
                setUser(res.data.result[0]);
                
            })
            .catch(err => console.log(err + " Catch err du useEffect"));
    }, [id]);
    
    
     const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };
    
    // Pour valider la modification du user
    const submit = (e) =>{
        e.preventDefault();
    
        axios.post(`${BASE_URL}/updateUserById`,{id, nom:user.nom, prenom:user.prenom, email:user.email, birthdate:user.birthdate})
            .then((res) => { 
                setIsValidated(true);
                console.log(res);
                //setUser(user.filter((e) => e.id !== id))
            })
            .catch((err) => console.log(err + " Catch err du submit"));
    };

   return(
        <div>
        
        {user && (
           <form onSubmit={submit}>
                <label> Nom : </label>
                <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={user.nom} />
                <label> Prénom : </label>
                <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={user.prenom} />
                <label> Email : </label>
                <input type='text' placeholder='email' name='email' onChange={handleChange} value={user.email} />
                <label> Date de naissance : </label>
                <input type='date' placeholder='birthdate' name='birthdate' onChange={handleChange} value={user.birthdate} />
                <input type="submit" className="myButton"  value="Modifier les informations" />
        </form>   
            )}
            
        {isValidated && (
            <p>Votre modification a bien été prise en compte</p>
        )}
        </div>
       )
}

export default UpdateUser;