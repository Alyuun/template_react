import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {useState} from "react";
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
        <input type = "text" placeholder = "name" name = "name" onChange = {handleChange} value = {productData.name} />
        <input type = "text" placeholder = "description" name = "description" onChange = {handleChange} value = {productData.description} />
        <input type = "number" placeholder = "price" name = "price" onChange = {handleChange} value = {productData.price} />
        <input type = "text" placeholder = "destination" name = "destination" onChange = {handleChange} value = {productData.destination} />
        <input type = "text" placeholder = "thematique" name = "thematique" onChange = {handleChange} value = {productData.thematique} />
        <input type='file' name='picture'/>
        <input type="submit" className="myButton" />
        </form>
        );
};

export default AddProduct;