import React from "react";
const StoreContext = React.createContext([]);

const initialState = {
    panier:[],
    product:[],
    user:{
        isAdmin : false,
        isLogged : false
    }
};

export {StoreContext, initialState};