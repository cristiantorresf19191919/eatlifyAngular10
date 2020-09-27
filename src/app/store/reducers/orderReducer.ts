import {
    Action,
    createReducer,
    on,
    createSelector,
    createFeatureSelector,
  } from "@ngrx/store";
import { loadOrder } from '../actions/orderActions';

export interface OrderState{
    amount:number;
    products:Array<any>;
    dateTime:string;
    id:string;
}

export const orderInitialState: OrderState = {
    amount: 0,
    dateTime:' ',
    id: ' ',
    products: []
}

const _orderReducer = createReducer(
    orderInitialState,
    on(loadOrder,(state,{order})=>({...state,...order}))
);
export function orderReducerF(
    state: OrderState | undefined,
    action: Action
){
    return _orderReducer(state,action);
}

export const getOrderState = createFeatureSelector<OrderState>(
  "order"  
);

export const getOrderAmount = createSelector(
    getOrderState,
    (state:OrderState)=> state.amount
)

export const getOrderProducts = createSelector(
    getOrderState,
    (state:OrderState) => state.products
)



