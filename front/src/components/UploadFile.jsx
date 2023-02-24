import {Fragment, useState} from 'react';
import {BASE_URL} from "../tools/constante.js";
import axios from 'axios';
import {useParams} from "react-router-dom";

// import {AppContext} from './reducer/reducer.js'

const UploadFile = () => {
    const {id} = useParams();
    // const [state, dispatch] = useContext(AppContext)
    const [name, setName] = useState("");
    
    const submit = (e) => {
        e.preventDefault();
        const dataFile = new FormData();
        const files = {...e.target.avatar.files};
        
        console.log(files);
        
        // ajouter d'autre input au formulaire
        dataFile.append('id', id);
        dataFile.append('avatar', files[0]);
        
        // L'image
        dataFile.append('files', files[0], files[0].name);
        
        
        axios.post(`${BASE_URL}/UploadFile`, dataFile)
        .then((res)=> {
            console.log(res);
            res.data.response && console.log('succesfully upload');
        })
        .catch((err) => {
            console.log(err + " Voici le catch du uploadFile");
        });
    };
    
    return (
        <Fragment>
            <h1>Ajouter/Modifier l'avatar</h1>
            <form onSubmit={submit} encType="multipart/form-data">
                <label name='avatar'>
                    <input type='file' name='avatar'/>
                </label>
                <input type='submit' value='submit' width="100" height="100"/>
            </form>
        </Fragment>
    );
};

//             <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />

export default UploadFile;