import React from "react";
const StoreContext = React.createContext([]);

const initialState = {
    panier:[],
    product:[],
    user:{}
};

export {StoreContext, initialState};