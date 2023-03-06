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
		navigate("/home");
	}
	
	console.log(state.user);

	return (
		<Fragment>
            <header>
                <div className="header">
                    <div className="logo_title">
                      <img onClick={handleClick} src={logo} alt="logo" className="logo"/>
                      <h1>Travelia</h1>
                    </div>
<nav role="navigation">
  <div id="menuToggle">
    <input type="checkbox"/>
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
      <a href="#"><li>Par continent</li></a>
      <a href="#"><li>Par Thématique</li></a>
      <a href="#"><li>Info</li></a>
      <a href="#"><li>Contact</li></a>
    </ul>
  </div>
</nav>
		        </div>
            </header>
        <div>
            {state.isLogged == false && (
              <button><NavLink to="/">Se connecter</NavLink></button>)}
            {state.isLogged == true && (
            <Fragment>
              Bonjour {state.user.nom} {state.user.prenom}  
              <button><NavLink to ="/logout">Se déconnecter</NavLink></button>
            </Fragment>
            )}
            <Nav />
        </div>    
        </Fragment>
	);
};

export default Header;