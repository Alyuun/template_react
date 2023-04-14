import { useState, useContext } from "react";
import { StoreContext } from "../tools/context.js";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useNavigate } from "react-router-dom";
 
const Login = () => {
    const [ _, dispatch] = useContext(StoreContext);
    const initialState = {password:'',email:''};
    const [info , setInfo] = useState(initialState); 
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/AddUser");
    };
    
    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, {
                email: login.email,
                password: login.password
            })
            .then(res => {
                // message
                console.log(res)
                if(res.data.response.user.id){
                    navigate("/AllProducts");
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user: true,
                            admin: res.data.response.user.admin,
                            id: res.data.response.user.id,
                            nom: res.data.response.user.nom,
                            prenom: res.data.response.user.prenom,
                            cart_id: res.data.response.cart_id
                    }
                    });
                // sauvegarde du token dans le localStorage et ajout du token dans le header de Axios                    
                localStorage.setItem('jwtToken', res.data.response.token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.response.token;
                setInfo(initialState);
                setLogin(true);
                    
                }else {
                    alert("Identifiants incorrects");
                }
            })
            .catch(err => {
                alert("Identifiant ou mot de passe incorrect");
                console.log(err, " => Voici le catch de la fonction submit du login.jsx");
            }
            );
    };

    return (
        <form onSubmit={submit}>
                <legend className="legend">Connexion</legend>
                <div className="connexion">
                <div className="input">
                    <input type="text" name="email" placeholder="Adresse mail" onChange={handleChange} value={login.email} required />
                    <span><i className="far fa-envelope"></i></span>
                </div>
                <div className="input">
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={login.password} required />
                <span><i className="fa fa-lock"></i></span>
                </div>
                    <button type="submit" className="submit"><i className="fa fa-arrow-right"></i></button>
                    <button id="login-button" onClick={handleSubmit}>Tu n'as pas de compte ? Clique ici !</button>
            </div>
        </form>
    );
};

export default Login;

/*<input type='submit' classNameName="myButton" />
*/
