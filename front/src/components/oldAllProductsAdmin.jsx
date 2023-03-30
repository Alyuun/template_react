import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect} from "react"

const AllProduct = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/allProducts`)
        .then(res => setProducts(res.data.result))
        .catch(err => console.log(err))
    }, [])
    
    const deleteProduct = (id) => {
        console.log(id)
        axios.post(`${BASE_URL}/deleteProductById`, {id})
        .then(res => console.log(res))
        .catch(err => console.log(err + " Problème de la fonction delete product by id"))
    }
    
    return(
        <div>
            {products.map((product, i) => {
                return(
                    <div key = {i}>
                        <p> id : {product.id}</p>
                        <p>name : {product.name}</p>
                        <p> description : {product.description} </p>
                        <p> price: {product.price} </p>
                        <p> destination : {product.destination} </p>
                        <button className="myButton" onClick={() => deleteProduct(product.id)}> X </button>
                   </div>
                )
            })}
        </div>
    )
}

export default AllProduct;