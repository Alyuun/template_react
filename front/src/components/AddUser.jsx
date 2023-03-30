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
        
        dataFile.append('files', files[0], files[0].name);
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
        <label>Choisissez un avatar : </label>
        <input type='file' name='avatar'/>
            <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={userData.nom} />
            <input type='text' placeholder='prenom' name='prenom' onChange={handleChange} value={userData.prenom} />
            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
            <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password}  />
            <p>Date d'anniversaire : <input type='date' name='birthdate' onChange={handleChange} value={userData.birthdate} /></p>
            <input type='submit' className="myButton" />
        </form>
    );
};

/*            <img src={`${BASE_URL}/img/${userData.avatar}`} alt={`Avatar de ${userData.nom} ${userData.prenom}`} width="100" height="100" border= "1px solid black"/>
*/
export default AddUser;