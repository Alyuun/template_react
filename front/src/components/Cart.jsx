import {StoreContext} from "../tools/context.js";
import React,{useEffect} from "react";
import axios from "axios";
import { BASE_URL } from "../tools/constante.js";

const Cart = () => {
    const [state, dispatch] = React.useContext(StoreContext);
    
    
    useEffect(() => {
        if(state.user.cart_id){
            axios.post(`${BASE_URL}/getCart`,{cart_id:state.user.cart_id})
            .then(res => {
                // on met le panier dans le Reducer
                dispatch({type:"ADD_CART", payload:res.data.result})
            })
            .catch(e => console.log(e))
            
        }
    },[])
    
    const removeCart = (product) => {
        dispatch({
            type: "REMOVE_CART",
            payload: state.panier.filter((e) => e.id !== product.id)
        });
    };
    
    console.log(state);
    
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
        <ul>
            {state.panier.map((product, i) => {
                return(
                    <div key = {i}>
                    <p>{}</p>
                        <p> id : {product.id}</p>
                        <p>name : {product.name}</p>
                        <p> description : {product.description} </p>
                        <p> price: {product.price} </p>
                        <p> destination : {product.destination} </p>
                        <button onClick={submitCart}></button>
                        <button onClick={() => removeCart(product)}>Retirer du panier</button>
                   </div>
                )
            })}
        </ul>
        )
}
export default Cart;