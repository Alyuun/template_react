import {useState, useEffect, Fragment, useContext} from "react";
import { StoreContext } from "../tools/context.js";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../tools/constante.js";
import {NavLink} from "react-router-dom";/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';*/


const DetailProduct = () => {
    const [product, setproduct] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    
  // Récupération du state et du dispatch
  const [state, dispatch] = useContext(StoreContext);    
    
    // Vérifie que c'est le bon product qui veut update le profil, sinon on redirige
    useEffect(()=> {
        axios.post(`${BASE_URL}/getproductById`,{id})
            .then(res => {
                console.log(res);
                const data = res.data.result[0];
                setproduct([data]);
            })
            .catch(err => console.log(err + " Catch err du useEffect"));
    }, [id]);

   return(
        <Fragment>
            {product.map((product, i) => {
                return(
                    <div key={i}>
                      <section className="articles">
                        <div /*className="article"*/>
                          <div>
                            {state.user.isAdmin === true && (
                              <p> id : {product.id}</p>)}      
                              <img src={`${BASE_URL}/img/${product.picture}`} alt={product.name} />
                          </div>
                          <div className="article-contain">
                            <h2 id="detail-article-title">{product.name}</h2>
                            <div id="destination">Destination <i className="fas fa-plane"></i> {product.destination}</div>
                            <div id="description">{product.description}</div>
                            <div className="price">
                              <div className="product-rrp">{product.price + 350}€</div>
                              <div className="product-price">{product.price}€</div>
                            </div>
                            {product.thematique === "Romantique" && ( <div><i className="fas fa-heart"></i>{product.thematique}</div>)}
                            {product.thematique === "Temples et monuments" && ( <div><i className="fas fa-landmark"></i>{product.thematique}</div>)}
                            {product.thematique === "Détente" && ( <div><i className="fas fa-water"></i>{product.thematique}</div>)}
                            {product.thematique === "Festival" && ( <div><i className="fas fa-music"></i>{product.thematique}</div>)}
                            {product.thematique === "Traditions" && ( <div><i className="fas fa-fish"></i>{product.thematique}</div>)}
                            {product.thematique === "Famille" && ( <div><i className="fas fa-dog"></i>{product.thematique}</div>)}
                            {product.thematique === "Shopping" && ( <div><i className="fas fa-store"></i>{product.thematique}</div>)}
                          </div>
                        </div>
                      </section>
                    </div>
                  )
              })}
        </Fragment>
      )
};

export default DetailProduct;