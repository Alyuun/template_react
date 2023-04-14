import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../tools/context.js";

/*          <NavLink to="/searchFilter">
            Barre de recherche
          </NavLink>*/

const Nav = (props) => {
  const [state] = useContext(StoreContext);
  
  return (
    <nav>
    </nav>
  );
};

export default Nav;