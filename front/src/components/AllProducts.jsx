import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { useState, useEffect } from "react";
import SearchProduct from "./SearchProduct.jsx";
import { Fragment } from "react";

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
  
  const testOnClick = (e) => {
    e.preventDefault();
    const {destination, minPrice, maxPrice, thematique} = searchValue;
    
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
  
  const resetSearch = () => {
    setProductsFiltred([]);
    setSearchValue(initState);
  };
  
  return (
    <Fragment>
    <div>
            {/*<input placeholder="Destination" value={searchValue} onChange={handleInputChange} />*/}
            
            <form onSubmit={testOnClick}>
              <input placeholder="Destination" name='destination' value={searchValue.destination}  onChange={handleChange} />
              <input placeholder="minPrice" name='minPrice' value={searchValue.minPrice} onChange={handleChange} />
              <input placeholder="maxPrice" name='maxPrice' value={searchValue.maxPrice} onChange={handleChange} />
              <input placeholder="Voyageurs"  name='voyageurs' value={searchValue.voyageurs} onChange={handleChange} />
              <select name="thematique" value={searchValue.thematique} onChange={(e) => handleChange(e)}>
                <option>Choisissez une thématique</option>
                {thematiques.map((product) => {
                  return (
                    <option value={product.thematique}>{product.thematique}</option>
                  );
                })}
              </select>
              
              <input type="submit" className="myButton"  value='Rechercher'/>
            </form>
              <button className="myButton" onClick={resetSearch}>Tout effacer</button>
        </div>
        <SearchProduct arrayMap={productsFiltred} />
        <SearchProduct arrayMap={products} />
    </Fragment>
  );
};

export default AllProduct;

