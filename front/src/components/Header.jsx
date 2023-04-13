import Nav from './Nav.jsx';
import { useContext, Fragment } from "react";
import { StoreContext } from "../tools/context.js";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [state] = useContext(StoreContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const clickCart = () => {
    navigate("/cart");
  };

  console.log(state.user);

  return (
    <Fragment>
      <div className="header_container">
        <div className="header_menu">
          <div className="header_menu_buttons_left">
            <div className="dropdown">
              <a href="#">Par Continent</a>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <ul>
                      <li><a href="#">Europe</a></li>
                      <li><a href="#">Amérique</a></li>
                      <li><a href="#">Asie</a></li>
                      <li><a href="#">Océanie</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <a href="#">Par Thématique</a>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <ul>
                      <li><a href="#">Famille</a></li>
                      <li><a href="#">Temples et Monuments</a></li>
                      <li><a href="#">Romantique</a></li>
                      <li><a href="#">Traditions</a></li>
                      <li><a href="#">Shopping</a></li>
                      <li><a href="#">Détente</a></li>
                      <li><a href="#">Festival</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="header_menu_buttons_right">
            <div className="dropdown">
              <div className="dropdown-right">
                {state.user.isLogged === false && (
                  <a href="/login">Se connecter</a>
                  /*<button className="myButton"><NavLink to="/login">Se connecter</NavLink></button>*/
                )}
                {state.user.isLogged === true && (
                  <Fragment>
                    Bonjour {state.user.nom} {state.user.prenom}
                    <a href="/logout">Se déconnecter</a>
                  </Fragment>
                )}
              </div>
            </div>
            {state.user.isLogged === false && (
              <div className="dropdown">
                <a href="/addUser">Créer un compte</a>
              </div>
            )}
            <div>
              <i onClick={clickCart} className="fas fa-cart-arrow-down"></i>
            </div>
            <div className="dropdown">
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="header_content">
          <div onClick={handleClick} className="header_title">
            Travelia
          </div>
        </div>
      </div>
      <div className="main_container"></div>
      <Nav />
    </Fragment>
  );
};

export default Header;