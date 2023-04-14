import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useState, useEffect, useContext } from "react";
import SearchProduct from "./SearchProduct.jsx";
import { Fragment } from "react";
import { StoreContext } from "../tools/context.js";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const initState = {
    destination:"",
    thematique:"",
    voyageurs:"",
    minPrice:"",
    maxPrice:""
  };
  
  const [productsFiltred, setProductsFiltred] = useState([]);
  const [searchValue, setSearchValue] = useState(initState);
  const [products, setProducts] = useState([]);
  const [thematiques, setThematiques] = useState([]);
  const navigate = useNavigate();
  // Récupération du state et du dispatch
    const [state, dispatch] = useContext(StoreContext);  

  useEffect(() => {
    axios
      .get(`${BASE_URL}/allProducts`)
      .then((res) => setProducts(res.data.result))
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    axios
    .get(`${BASE_URL}/getThematique`)
    .then((res) => {
    console.log(res.data);
    setThematiques(res.data.result); 
    })
    .catch((err) => console.log(err));
  }, []);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setSearchValue({...searchValue, [name]:value});
  };
  
  const fnFilterProduct2 = (data, type, param) => {
    const productsFilter = data.filter((product) =>
      product[type].toLowerCase().includes(param.toLowerCase())
    );
    return productsFilter;
  };
  
  const onClick = (e) => {
    
    e.preventDefault();
    const {destination, minPrice, maxPrice ,thematique} = searchValue;
    
    let productsFilter = products;
    let type="";
    let param="";
    
    // on filtre par destination
    if(destination.trim() !== ""){
      type="name";
      param=destination.trim().toLowerCase();
      productsFilter = fnFilterProduct2(productsFilter,type,param);
    }
    
    // on filtre par thématique
    if(thematique.trim() !== ""){
      type="thematique";
      param=thematique.trim().toLowerCase();
      productsFilter = fnFilterProduct2(productsFilter,type,param);
    }
    
    // on filtre par prix minimum
    if(minPrice.trim() !== "" && !isNaN(minPrice.trim())){
      productsFilter = productsFilter.filter((product) =>
        product.price > minPrice
      );
    }
    
    // on filtre par prix maximum
    if(maxPrice.trim() !== "" && !isNaN(maxPrice.trim())){
      productsFilter = productsFilter.filter((product) =>
        product.price < maxPrice
      );
    }
    
    setProductsFiltred(productsFilter);
  };
  
  console.log(productsFiltred)
  console.log(products)
  
  const resetSearch = () => {
    setProductsFiltred([]);
    setSearchValue(initState);
  };
  
    const handleSubmitProduct = (e) => {
        e.preventDefault();
        navigate("/AddProduct");
    };  
    
    const handleSubmitUser = (e) => {
        e.preventDefault();
        navigate("/AllUsers");
    };  
        
  
  return (
    <Fragment>
    <div>
        {state.user.isAdmin === true && (
        <div>
        <h1>Tableau de bord administrateur</h1>
        <div className="admin">
           <button className="myButton" onClick={handleSubmitProduct}>Ajouter un nouveau produit</button>
           <button className="myButton" onClick={handleSubmitUser}>Afficher la liste des utilisateurs</button>
        </div>
        </div>
           )}
            <form className="form" onSubmit={onClick}>
              <input className="input" placeholder="Destination" name='destination' value={searchValue.destination}  onChange={handleChange} />
              <input className="input"  placeholder="Prix minimum" name='minPrice' value={searchValue.minPrice} onChange={handleChange} />
              <input className="input"  placeholder="Prix maximum" name='maxPrice' value={searchValue.maxPrice} onChange={handleChange} />
              <input className="input"  placeholder="Nombre de voyageurs"  name='voyageurs' value={searchValue.voyageurs} onChange={handleChange} />
              <select name="thematique" value={searchValue.thematique} onChange={(e) => handleChange(e)}>
                <option>Choisissez une thématique</option>
                {thematiques.map((product, thematiqueKey) => {
                  return (
                    <option key={thematiqueKey} value={product.thematique}>{product.thematique}</option>
                  );
                })}
              </select>
              <input type="submit" className="myButton" value='Rechercher'/>
              <button onClick={resetSearch} >Tout effacer</button>
            </form>
              
        </div>
        <SearchProduct arrayMap={productsFiltred} />
        {productsFiltred.length > 0 && (
        <div className="msg-arrow">
        <h1>N'oubliez pas de regarder nos autres circuits</h1>
        <i className="fas fa-arrow-down"></i>
        </div>
        )}
        <SearchProduct arrayMap={products} />
    </Fragment>
  );
};

export default AllProduct;

