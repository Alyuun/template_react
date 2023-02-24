const reducer = (state, action) =>{
    switch(action.type){
        case 'ADD_CART':
            return{
                ...state,
                panier :[...state.panier, action.payload]
            }
            
            case 'REMOVE_CART':
                return{
                    ...state,
                    panier : action.payload
                }
                
            case 'LOGIN':
                return{
                    ...state,
                    user:action.payload
                }
                
/*                case 'MODIFY_CART':
                    return{
                        ...state,
                        panier : action.payload
                    }*/

        default:
            return state;
    }
}

export {reducer};