/* import { Action } from 'redux';
import { Restaurant } from '../../../models/Restaurant';
import { RestaurantTypes } from './restaurantTypes';

export const INITIAL_STATE:Restaurant = {
    _id : '',
    name: null,
    address: null,
    description: null, 
    phone: null,
    image: null,
    productos: [],
    ventas: []
}

interface ActionType {
    type:string;
    payload: Restaurant;
}

export function RestaurantReducer(state:Restaurant = INITIAL_STATE,action:ActionType):Restaurant{
    const {type} = action;
    action.type
    
    switch(type){
            
        case RestaurantTypes.AGREGAR_RESTAURANTE:
            return {
                ...state,
                ...action.payload                            

            }
        case RestaurantTypes.EDITAR_RESTAURANTE:
            return {
                ...state,
                ...action.payload
            }
        case RestaurantTypes.ELIMINAR_RESTAURANTE:
            return {
                ...state,
            name: null,
            address: null,
            description: null, 
            phone: null,
            image: null,
            productos: [],
            ventas: []
            }
        case RestaurantTypes.VER_RESTAURANTE:
            return {
                ...state,
                ...action.payload                            

            }
        default:
            return state;


         


    }

} */