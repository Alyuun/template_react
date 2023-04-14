import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState } from "react";
import {useNavigate} from "react-router-dom";


const AddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        picture: "",
        name : "",
        description: "",
        price: "",
        destination: "",
        thematique: ""
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData({...productData, [name]: value});
    };
    
    const submit = (e) => {
        e.preventDefault();
        
        const dataFile = new FormData();
        const files = {...e.target.picture.files};     
        
        dataFile.append('files', files[0], files[0].name);
        dataFile.append('name', productData.name);
        dataFile.append('description', productData.description);
        dataFile.append('price', productData.price);
        dataFile.append('destination', productData.destination);
        dataFile.append('thematique', productData.thematique);
        
        axios.post(`${BASE_URL}/addProduct`, dataFile)
        .then(res => {
            console.log(res);
            navigate("/allProducts");
        });

        };
    
    return(
        <form onSubmit={submit}>
        <h1>Ajouter un nouveau produit</h1>
        <input className="input-add-product" type = "text" placeholder = "Nom" name = "name" onChange = {handleChange} value = {productData.name} />
        <input className="input-add-product" type = "text" placeholder = "Description" name = "description" onChange = {handleChange} value = {productData.description} />
        <input className="input-add-product" type = "number" placeholder = "Prix" name = "price" onChange = {handleChange} value = {productData.price} />
        <input className="input-add-product" type = "text" placeholder = "Destination" name = "destination" onChange = {handleChange} value = {productData.destination} />
        <input className="input-add-product" type = "text" placeholder = "Thématique" name = "thematique" onChange = {handleChange} value = {productData.thematique} />
        <label>Choisir une image produit :</label>
        <input className="input-add-product" type='file' name='picture'/>
        <input className="input-add-product" type="submit" className="myButton"  />
        </form>
        );
};

export default AddProduct;