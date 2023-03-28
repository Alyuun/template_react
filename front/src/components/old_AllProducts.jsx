import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState, useEffect, useContext} from "react";
import {StoreContext} from "../tools/context.js";
import {useNavigate} from "react-router-dom";

const AllProduct = () => {
    
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${BASE_URL}/allProducts`)
        .then(res => setProducts(res.data.result))
        .catch(err => console.log(err));
    }, []);
    
    const handleSubmit = (e,id) => {
    e.preventDefault();
    navigate(`/updateProduct/${id}`);
    };  
    
    const addCart = (product) => {
        const isInCart = state.panier.filter(e => e.id === product.id).length > 0;
        if(!isInCart){
            dispatch({
                type: "ADD_CART",
                payload: product
            });
            axios.post(`${BASE_URL}/addCart`,{
                
                cart_id:state.user.cart_id,
                product_id:product.id
            });
        } else {
            alert("Vous avez déjà ce circuit dans votre panier");
        }
    };
    
    const deleteProduct = (id) => {
        console.log(id);
        axios.post(`${BASE_URL}/deleteProductById`, {id})
        .then(res => {
            console.log(res);
            setProducts(products.filter((e) => e.id !== id));
        })
        .catch(err => console.log(err + " Problème de la fonction delete product by id"));
    };
    
    const filteredProducts = products.filter((product) => {
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    }
    
    const handleInputChange = (event) => {
        setSearchValue(event.target.value)
      }
    
    return(
        <div>
            {products.map((product, i) => {
                return(
                    <div>
                        <div>
                        <p value={searchValue} onChange={handleInputChange} />
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
                    <div key = {i}>
                        <p> id : {product.id}</p>
                        <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} width="100" height="100" margin="2em" padding="2em"/>
                        <p>name : {product.name}</p>
                        <p> description : {product.description} </p>
                        <p> price: {product.price} </p>
                        <p> destination : {product.destination} </p>
                        {state.user.isAdmin === true && (
                        <button onClick={(e) => handleSubmit(e,product.id)}> Modifier les informations</button>
                        )}
                        <button onClick={() => addCart(product)}>Ajouter au panier</button>
                        {state.user.isAdmin === true && (
                        <button onClick={() => {deleteProduct(product.id)}}> Supprimer le produit </button>
                        )}
                        </div>
                   </div>
                );
            })}
        </div>
    );
    }
}

export default AllProduct;