import React, { useState, useEffect } from "react";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";

const SearchFilter = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/allProducts`)
        .then((response) => setProducts(response.data))
        .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <SearchFilter value={searchValue} onChange={handleInputChange} />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.picture} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
            <p>Destination: {product.destination}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;    