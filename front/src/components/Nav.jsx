import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../tools/context.js";

/*          <NavLink to="/searchFilter">
            Barre de recherche
          </NavLink>*/

const Nav = (props) => {
  const [state, dispatch] = useContext(StoreContext);
  
  return (
    <nav>
      <ul>
        {state.user.isLogged == false && (
        <li>
          <NavLink to="/login">
            Se connecter
          </NavLink>
        </li>
        )}
        <li>
          <NavLink to="/addUser">
            Creer un compte
          </NavLink>
        </li>
        {state.user.isAdmin == true && (
        <li>
          <NavLink to="/allUsers">
          Afficher la liste des utilisateurs
          </NavLink>
        </li>
        )}
        {state.user.isAdmin == true && (        
        <li>
          <NavLink to="/addProduct">
            Ajouter un nouveau circuit voyage
          </NavLink>
        </li>
        )}        
          <li>
          <NavLink to="/allProducts">
            Afficher la liste des circuits voyages
          </NavLink>
          </li>
        <li>
          <NavLink to="/cart">
            Panier
          </NavLink>
        </li>
        <li>
          <NavLink to="/uploadFile">
            Télécharger un fichier
          </NavLink>
        </li>  
        <li>
        </li>          
      </ul>
    </nav>
  );
};

export default Nav;

