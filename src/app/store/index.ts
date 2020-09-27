import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action } from '@ngrx/store';
import { Restaurant } from 'src/app/models/Restaurant';
import { restaurantReducerF, RestaurantState } from './reducers/restaurantReducer';
import { CounterState, counterReducer } from './reducers/countReducer';
import { orderReducerF, OrderState } from './reducers/orderReducer';


export interface State{
    restaurant: RestaurantState;
    // mas estados aca
    count: CounterState;
    order:OrderState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State,Action>>(
    'ROOT_REDUCER_TOKEN',
    {
        factory: () => ({
            restaurant: restaurantReducerF,
            count: counterReducer,
            order:orderReducerF
        })
    }
)