import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, pluck, tap } from 'rxjs/operators';
import { loadOrder, loadOrderEffect } from '../actions/orderActions';
import { addRestaurant, errorHttpRestaurant, loadRestaurant, getRestaurantEffect, viewRestaurant, updateRestaurantEffect, editRestaurant, deleteRestaurant, deleteRestaurantEffect } from '../store/actions/restaurantActions';



 
@Injectable()
export class OrderEffects{

    loadOrder$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadOrderEffect),
            map(action => loadOrder({order:action.order}))

        )
    
    );










    constructor(
        private actions$: Actions,
        
      ) {}

}