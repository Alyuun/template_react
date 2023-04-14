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
              <a href="/allProducts">Par Continent</a>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <ul>
                      <li><a href="/allProducts">Europe</a></li>
                      <li><a href="/allProducts">Amérique</a></li>
                      <li><a href="/allProducts">Asie</a></li>
                      <li><a href="/allProducts">Océanie</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="dropdown">
              <a href="/allProducts">Par Thématique</a>
              <div className="dropdown-content">
                <ul>
                  <li>
                    <ul>
                      <li><a href="/allProducts">Famille</a></li>
                      <li><a href="/allProducts">Temples et Monuments</a></li>
                      <li><a href="/allProducts">Romantique</a></li>
                      <li><a href="/allProducts">Traditions</a></li>
                      <li><a href="/allProducts">Shopping</a></li>
                      <li><a href="/allProducts">Détente</a></li>
                      <li><a href="/allProducts">Festival</a></li>
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