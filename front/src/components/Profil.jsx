import {BASE_URL} from "../tools/constante.js"
import axios from "axios"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const Profil = () => {
    const {id} = useParams()
    
    const [articles, setArticles] = useState([])
    const [commentaires, setCommentaires] = useState([])
    const [profilData, setProfilData] = useState([])
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProfilData`,{user_id:id})
        .then(res => {
            setArticles(res.data.articles)
            setCommentaires(res.data.com)
            setProfilData(res.data.user)
        })
        .catch(err => console.log(err))
    },[id])
    
    return (
        <div>
        <h2>PROFIL</h2>
        {profilData.map((data,i) => {
        //{nom: 'testme', prenom: 'testme', email: 'testme', role: 'user'}
            return(
                <div key={i}>
                    <p>Nom:{data.nom}</p>
                    <p>Prenom:{data.prenom}</p>
                    <p>Email:{data.email}</p>
                    <p>Role:{data.role}</p>
                </div>
            ) 
        })}
        <h2>ARTICLES</h2>
        {articles.map((article,i) => {
            return(
                <div key={i}>
                    <p>id:{article.id}</p>
                    <p>title:{article.title}</p>
                    <p>contente:{article.contente}</p>
                </div>
            ) 
        })}
        <h2>COMMENTAIRE</h2>
        {commentaires.map((commentaire,i) => {
        // {article_id: 6, contente: 'test com'}
            return(
                <div key={i}>
                    <p>Article id:{commentaire.article_id}</p>
                    <p>contente:{commentaire.contente}</p>
                </div>
            ) 
        })}
        </div>    
    )
}

export default Profil