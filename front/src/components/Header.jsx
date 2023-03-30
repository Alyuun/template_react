import Nav from './Nav.jsx';
import { useContext, Fragment } from "react";
import { StoreContext } from "../tools/context.js";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../tools/constante.js";
import logo from '../img/logo.jpg'


const Header = () => {
	const [state, dispatch] = useContext(StoreContext);

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/");
	}
	
	console.log(state.user);

	return (
		<Fragment>
            <div className="header_container">
            
                <div className="header_menu">
                
                  <div className="dropdown">
                  <a href="#">Par Continent</a>
                    <div className="dropdown-content">
                      <a href="#">Europe</a>
                      <a href="#">Amérique</a>
                      <a href="#">Asie</a>
                      <a href="#">Océanie</a>
                    </div>
                  </div>
                  
                  <div className="dropdown">
                    <a href="#">Par Thématique</a>
                    <div className="dropdown-content">
                      <a href="#">Famile</a>
                      <a href="#">Romantique</a>
                      <a href="#">Traditionnel</a>
                      <a href="#">Shopping</a>
                      <a href="#">Détente</a>
                      <a href="#">Festival</a>
                    </div>
                  </div>
                  <div className="dropdown">
                    <a href="/contact">Contact</a>
                    </div>
                </div>
            	<div className="header_content">
            		<div onClick={handleClick} className="header_title">
            			Travelia
            		</div>
            		
            	</div>
            	
            </div>

            <div className="main_container">

            </div>
        <div>
            {state.isLogged == false && (
              <button className="myButton"><NavLink to="/">Se connecter</NavLink></button>)}
            {state.isLogged == true && (
            <Fragment>
              Bonjour {state.user.nom} {state.user.prenom}  
              <button className="myButton"><NavLink to ="/logout">Se déconnecter</NavLink></button>
            </Fragment>
            )}
            <Nav />
        </div>    
        </Fragment>
	);
};

export default Header;