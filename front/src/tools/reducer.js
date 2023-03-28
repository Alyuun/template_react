const reducer = (state, action) =>{
    switch(action.type){
        case 'INIT_CART':
            console.log(action.payload);
            return{
                ...state,
                panier : [...state.panier, ...action.payload]
            };
            
        case 'ADD_CART':
            console.log(action.payload);
            return{
                ...state,
                panier : [...state.panier, action.payload]
            };
            
        case 'REMOVE_CART':
            return{
                ...state,                    
                panier : action.payload
                };
                
        case 'RESET_CART' :
            return {
                ...state,
                cart : action.payload
            };
            
        case 'DELETE_PRODUCT' :
            return {
                ...state,
                product : action.payload
            }
                
        case 'LOGIN':
            return{
                ...state,
                user : {
                    isLogged : true,
                    isAdmin : action.payload.admin,
                    ...action.payload
                },
                isLogged : true
            };
                
        case 'LOGOUT' :
            return{
                ...state,
                user : {isLogged : false, isAdmin:false, id:null},
                isLogged : false,
                panier:[]
            };
        
        case 'MODIFY_USER' :
            return {
                ...state,
                user : action.payload
            };
            
        case 'DELETE_USER' :
            return {
                ...state,
                user : action.payload
            };
            
/*        case 'ADD_USER':
            console.log(action.payload);
            return{
                ...state,
                user : [...state.user, action.payload]
            };   */         
            
        default:
            return state;
    }
};

export {reducer};