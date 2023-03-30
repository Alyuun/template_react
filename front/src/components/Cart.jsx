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
        axios.post(`${BASE_URL}/addCart`, {product_id : state.panier.id, cart_id : state.user.cart_id})
        .then(res => console.log(res))
        .catch(err => console.log(err + "erreur du catch submitCart"));
    };
    
    /*const modifyCart = (product) => {
        dispatch({
            type: "MODIFY_CART",
            payload: state.panier
        })
    }*/
    
    return(
        <div>
        <ul>
            {state.panier.map((product, i) => {
                return(
                    <div key = {i}>
                        <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
                        <p> id : {product.id}</p>
                        <p>name : {product.name}</p>
                        <p> description : {product.description} </p>
                        <p> price: {product.price} </p>
                        <p> destination : {product.destination} </p>
                        <button className="myButton" onClick={() => removeCart(product)}>Retirer du panier</button>
                   </div>
                );
            })}
        </ul>
        <p>Total : {parseFloat(state.panier.reduce((acc, product) => acc + product.price, 0))}</p>
        <button className="myButton" onClick={submitCart}>Commander</button>
        </div>
        );
};
export default Cart;