import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {StoreContext} from "../tools/context.js";


const UpdateProduct = () => {
    const [product, setproduct] = useState(null);
    const [state, dispatch] = useContext(StoreContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [isValidated, setIsValidated] = useState(false);
    
    // Vérifie que c'est le bon product qui veut update le profil, sinon on redirige
    useEffect(()=> {
        axios.post(`${BASE_URL}/getproductById`,{id})
            .then(res => {
                console.log(res);
                setproduct(res.data.result[0]);
            })
            .catch(err => console.log(err + " Catch err du useEffect"));
    }, [id]);
    
    
     const handleChange = (e) => {
        const {name, value} = e.target;
        setproduct({...product, [name]: value});
    };
    
    // Pour valider la modification du product
    const submit = (e) =>{
        e.preventDefault();
    
        axios.post(`${BASE_URL}/updateproductById`,{id, name:product.name, description:product.description, price:product.price, destination:product.destination, thematique:product.thematique})
            .then((res) => { 
                setIsValidated(true);
                console.log(res);
                //setUser(user.filter((e) => e.id !== id))
            })
            .catch((err) => console.log(err + " Catch err du submit"));
    };

   return(
        <div>
        
        {product && (
           <form onSubmit={submit}>
                <label> Nom : </label>
                <input type='text' placeholder='name' name='name' onChange={handleChange} value={product.name} />
                <label> Description : </label>
                <textarea type='text' placeholder='description' name='description' onChange={handleChange} value={product.description} />
                <label> Prix : </label>
                <input type="number" min="0.00" max="10000.00" placeholder='price' name='price' onChange={handleChange} value={product.price} />
                <label> Destination : </label>
                <input type='text' placeholder='destination' name='destination' onChange={handleChange} value={product.destination} />
                <label>Thématique : </label>
                <input type="text" placeholder="Thématique" name="thematique" onChange={handleChange} value={product.thematique} />
                <input type="submit" className="myButton"  value="Modifier les informations" />
        </form>   
            )}
            
        {isValidated && (
            <p>Votre modification a bien été prise en compte</p>
        )}
        </div>
       );
};

export default UpdateProduct;