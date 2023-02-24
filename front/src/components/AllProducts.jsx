import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState, useEffect, useContext} from "react";
import {StoreContext} from "../tools/context.js";

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [state, dispatch] = useContext(StoreContext);
    
    console.log(state);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/allProducts`)
        .then(res => setProducts(res.data.result))
        .catch(err => console.log(err));
    }, []);
    
    const addCart = (product) => {
        dispatch({
            type: "ADD_CART",
            payload: product
        });
        axios.post(`${BASE_URL}/addCart`,{
            cart_id:state.user.cart_id,
            product_id:product.id
        });
    };
    
    const deleteProduct = (id) => {
        console.log(id);
        axios.post(`${BASE_URL}/deleteProductById`, {id})
        .then(res => console.log(res))
        .catch(err => console.log(err + " Problème de la fonction delete product by id"));
    };

    const refreshPage = () => {
        window.location.reload(false);
  }   ; 
    
    return(
        <div>
            {products.map((product, i) => {
            console.log(product);
                return(
                    <div key = {i}>
                        <p> id : {product.id}</p>
                        <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
                        <p>name : {product.name}</p>
                        <p> description : {product.description} </p>
                        <p> price: {product.price} </p>
                        <p> destination : {product.destination} </p>
                        <button onClick={() => addCart(product)}>Ajouter au panier</button>
                        <button onClick={() => {deleteProduct(product.id); refreshPage()}}> X </button>
                   </div>
                );
            })}
        </div>
    );
};

export default AllProduct;