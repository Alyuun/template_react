import {StoreContext} from "../tools/context.js";
import React,{useEffect, useContext} from "react";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext);
    
    console.log(state)
    
    useEffect(() => {
        if(state.user.cart_id && state.panier.length === 0){
            axios.post(`${BASE_URL}/getCart`,{cart_id:state.user.cart_id})
            .then(res => {
                // on met le panier dans le Reducer
                dispatch({
                    type:"INIT_CART", 
                    payload:res.data.result.cartProduct
                });
            })
            .catch(e => console.log(e));
            
        }
    },[]);
    
    const removeCart = (product) => {
        axios.post(`${BASE_URL}/deleteToCart`, {cart_id : state.user.cart_id, product_id : product.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
        dispatch({ 
            type: "REMOVE_CART",
            payload: state.panier.filter((e) => e.id !== product.id)
        });
    };
    
    const submitCart = () => {
      const productIds = state.panier.map(product => product.id);
      axios.post(`${BASE_URL}/addCart`, {product_id: productIds, cart_id: state.user.cart_id})
        .then(res => console.log(res))
        .catch(err => console.log(err + "erreur du catch submitCart"));
        
    alert('Commande envoyée !')    
    };
    
    return (
      <div className="cart-container">
        <div className="heading">
    <h1>Mon panier</h1>
    <a href="/allProducts" className="continue">Continuer Shopping</a>
  </div>
  <div className="cart">
        <ul className="cart-items cartWrap">
          {state.panier.map((product, i) => {
            return (
              <div key={i} className="cart-item infoWrap">
                <img
                  src={`${BASE_URL}/img/${product.picture}`}
                  alt={product.name}
                  width="100"
                  height="100"
                />
                <div className="cart-item-details">
                  <h3 id="cart-items-details-title">{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <p>Prix : {product.price} €</p>
                  <button className="remove-btn" onClick={() => removeCart(product)}>
                    Retirer du panier
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
        <div className="cart-summary">
          <p className="total">Total : {parseFloat(state.panier.reduce((acc, product) => acc + product.price, 0))} €</p>
          <button className="checkout-btn" onClick={submitCart}>Commander</button>
        </div>
      </div>
      </div>
    );
};
export default Cart;