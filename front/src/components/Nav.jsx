import { NavLink } from "react-router-dom";

const Nav = (props) => {
/*    useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken")
    if (!axios.defaults.headers.common["Authorization"] && jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    }
  }, [])*/
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/addUser">
            Creer un compte
          </NavLink>
        </li>
        <li>
          <NavLink to="/allUsers">
            Afficher la liste des utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink to="/addProduct">
            Ajouter un nouveau circuit voyage
          </NavLink>
        </li>
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
          <NavLink to="/">
            Home
          </NavLink>
        </li>            
      </ul>
    </nav>
  );
};

export default Nav;