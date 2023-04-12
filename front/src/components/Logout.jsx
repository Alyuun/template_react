import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../tools/context.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();    
    
    useEffect(() => {
        dispatch({type : "LOGOUT"});
        localStorage.removeItem('jwtToken')
        delete
        axios.defaults.headers.common['Authorization'];
        setLogin(false);
        navigate("/");
        alert("Vous avez été déconnecté");
    }, []);
    
    return(
        <div>
        </div>
        );
};

export default Logout;