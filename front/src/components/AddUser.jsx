import axios from "axios";
import {BASE_URL} from '../tools/constante.js';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddUser = () => {
    const [userData, setUserData] = useState({
        nom:'',
        prenom:'',
        email:'',
        password:'',
        birthdate:'',
        avatar: ''
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData,[name]:value});
    };
    
    const navigate = useNavigate();
    
    const submit = (e) => {
        e.preventDefault();
        
        navigate("/allProducts");
        
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
            
        dataFile.append('nom', userData.nom);
        dataFile.append('prenom', userData.prenom);
        dataFile.append('email', userData.email);
        dataFile.append('password', userData.password);
        dataFile.append('birthdate', userData.birthdate);
        
        axios.post(`${BASE_URL}/addUser`,dataFile)
           .then(res => console.log(res));
    };
    
    
    return(
        <form onSubmit={submit} encType="multipart/form-data">
        <legend className="legend">Créez votre compte</legend>
        <div className="input">
        <p>Choisir un avatar :</p>
        <input type='file' name='avatar' required />
        </div>
        <div className="input">
            <input type='text' placeholder='Nom' name='nom' onChange={handleChange} value={userData.nom} required />
            </div>
            <div className="input">
            <input type='text' placeholder='Prenom' name='prenom' onChange={handleChange} value={userData.prenom} required />
            </div>

            <div className="input">
        <input type="text" name="email" placeholder="Adresse mail" onChange={handleChange} value={userData.email} required />
                    <span><i className="far fa-envelope"></i></span>
                     </div>  

                <div className="input">
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={userData.password} required />
                <span><i className="fa fa-lock"></i></span>
                </div>
                <div className="input">
                <p>Ma date de naissance : </p>
            <input type='date' name='birthdate' onChange={handleChange} value={userData.birthdate} />
            </div>
            <input id="login-button" type='submit' className="myButton" value="Créer son compte"/>
        </form>
        


                
    );
};

/*            <img src={`${BASE_URL}/img/${userData.avatar}`} alt={`Avatar de ${userData.nom} ${userData.prenom}`} width="100" height="100" border= "1px solid black"/>
*/
export default AddUser;