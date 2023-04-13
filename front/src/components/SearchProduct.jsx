import { BASE_URL } from "../tools/constante.js";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../tools/context.js";

const SearchProduct = ({ arrayMap }) => {
  
  // Récupération du state et du dispatch
  const [state, dispatch] = useContext(StoreContext);

  // Hook permettant de naviguer entre les pages
  const navigate = useNavigate();

  // Hook pour gérer les produits affichés
  const [products, setProducts] = useState([]);

  // Fonction permettant d'ajouter un produit au panier
  const addCart = (product) => {
    // Vérification si le produit est déjà dans le panier
    const isInCart = state.panier.filter((e) => e.id === product.id).length > 0;
    if (!isInCart) {
      // Ajout du produit au panier
      dispatch({
        type: "ADD_CART",
        payload: product,
      });
      // Envoi de la requête pour ajouter le produit au panier
      axios.post(`${BASE_URL}/addCart`, {
        cart_id: state.user.cart_id,
        product_id: product.id,
      });
      alert("Circuit ajouté dans votre panier")
    }
    else {
      alert("Vous avez déjà ce circuit dans votre panier");
    }
  };

  // Fonction pour gérer la soumission du formulaire de mise à jour du produit
  const handleSubmit = (e, id) => {
    e.preventDefault();
    navigate(`/updateProduct/${id}`);
  };
  
  const handleShow = (e, id) => {
    e.preventDefault();
    navigate(`/detailProductById/${id}`);
  };
  // Fonction pour supprimer un produit
  const deleteProduct = (id) => {
    axios
      .post(`${BASE_URL}/deleteProductById`, { id })
      .then((res) => {
        //console.log(res);
        // Mise à jour de la liste des produits après suppression
        setProducts(products.filter((e) => e.id !== id));
      })
      .catch((err) =>
        console.log(err + " Problème de la fonction delete product by id")
      );
  };

  return (
    // Affichage de la liste des produits
    <div className="articles-section">
      {
        // Vérification si la liste de produits est vide ou non
        arrayMap.length > 0 ?
          // Si la liste contient des produits
          arrayMap.map((product, i) => (
            <li key={i}>
              <section className="articles">
                <div className="article">
                  <div className="article-img">
                    {state.user.isAdmin === true && (
                        <p> id : {product.id}</p>
                    )}  
                    <img onClick={(e) => handleShow(e, product.id)} src={`${BASE_URL}/img/${product.picture}`} alt={product.name} />
                  </div>
                  <div className="article-contain">
                    <h2 id="article-title" onClick={(e) => handleShow(e, product.id)} >{product.name}</h2>
                    {product.thematique === "Romantique" && ( <p><i className="fas fa-heart"></i>{product.thematique}</p>)}
                    {product.thematique === "Temples et monuments" && ( <p><i className="fas fa-landmark"></i>{product.thematique}</p>)}
                    {product.thematique === "Détente" && ( <p><i className="fas fa-water"></i>{product.thematique}</p>)}
                    {product.thematique === "Festival" && ( <p><i className="fas fa-music"></i>{product.thematique}</p>)}
                    {product.thematique === "Traditions" && ( <p><i className="fas fa-fish"></i>{product.thematique}</p>)}
                    {product.thematique === "Famille" && ( <p><i className="fas fa-dog"></i>{product.thematique}</p>)}
                    {product.thematique === "Shopping" && ( <p><i className="fas fa-store"></i>{product.thematique}</p>)}                    
                    <div className="product-rrp">{product.price + 350}€</div>
                    <div className="product-price">{product.price}€</div>
                    <div className="button-test">
                      <div className="articles-button">
                        <i className="fas fa-cart-plus" onClick={() => addCart(product)}></i>
                        {state.user.isAdmin === true && (
                          <button className="myButton" onClick={(e) => handleSubmit(e, product.id)}>Modifier</button>)}
                        {state.user.isAdmin === true && (
                          <button className="myButton" onClick={() => {deleteProduct(product.id)}}>Supprimer</button>)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </li>
          )) :
        arrayMap.map((product) => (
        <div className="article-container">
        <div className="slide">
        <article>
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
            {state.user.isAdmin === true && (
              <p> id : {product.id}</p>)}
            <p>{product.description}</p>
            <p>Prix: {product.price}€</p>
            <p>Destination: {product.destination}</p>
            <p>Thématique : {product.thematique}</p>
            <button className="myButton" onClick={() => addCart(product)}>Ajouter au panier</button>
            {state.user.isAdmin === true && (
              <button className="myButton" onClick={(e) => handleSubmit(e,product.id)}>Modifier les informations</button>)}
            {state.user.isAdmin === true && (
              <button className="myButton" onClick={() => {deleteProduct(product.id)}}>Supprimer le produit</button>)}
          </li>
          </article>
          </div>
          </div>
        ))
    }
  </div>
    );
};

export default SearchProduct;


