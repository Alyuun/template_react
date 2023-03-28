import { BASE_URL } from "../tools/constante.js";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../tools/context.js";

const SearchProduct = ({ arrayMap }) => {

  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const addCart = (product) => {
    const isInCart = state.panier.filter((e) => e.id === product.id).length > 0;
    if (!isInCart) {
      dispatch({
        type: "ADD_CART",
        payload: product,
      });
      axios.post(`${BASE_URL}/addCart`, {
        cart_id: state.user.cart_id,
        product_id: product.id,
      });
    }
    else {
      alert("Vous avez déjà ce circuit dans votre panier");
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    navigate(`/updateProduct/${id}`);
  };

  const deleteProduct = (id) => {
    axios
      .post(`${BASE_URL}/deleteProductById`, { id })
      .then((res) => {
        //console.log(res);
        setProducts(products.filter((e) => e.id !== id));
      })
      .catch((err) =>
        console.log(err + " Problème de la fonction delete product by id")
      );
  };

return (
  <div>
    {
      arrayMap.length > 0 ?
        arrayMap.map((product, i) => (
        <div>
          <article className="article-container">
          <li key={i}>
            <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
            <h2>{product.name}</h2>
            {state.user.isAdmin === true && (
              <p> id : {product.id}</p>)}
            {/*<p onClick={(id) => fnFilterProduct(product.id)}> id : {product.id}</p>)}*/}
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
            <p>Destination: {product.destination}</p>
            <p>Thématique : {product.thematique}</p>
            <button onClick={() => addCart(product)}>Ajouter au panier</button>
            {state.user.isAdmin === true && (
              <button onClick={(e) => handleSubmit(e, product.id)}>Modifier les informations</button>)}
            {state.user.isAdmin === true && (
              <button onClick={() => {deleteProduct(product.id)}}>Supprimer le produit</button>)}
          </li>
          </article>
          </div>
        )) :
        arrayMap.map((product) => (
        <div className="article-container">
        <article className="article-container">
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
            {state.user.isAdmin === true && (
              <p> id : {product.id}</p>)}
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
            <p>Destination: {product.destination}</p>
            <p>Thématique : {product.thematique}</p>
            <button onClick={() => addCart(product)}>Ajouter au panier</button>
            {state.user.isAdmin === true && (
              <button onClick={(e) => handleSubmit(e,product.id)}>Modifier les informations</button>)}
            {state.user.isAdmin === true && (
              <button onClick={() => {deleteProduct(product.id)}}>Supprimer le produit</button>)}
          </li>
          </article>
          </div>
        ))
    }
  </div>
    );
};

export default SearchProduct;