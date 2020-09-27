import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, pluck, tap } from 'rxjs/operators';
import { RestaurantService } from '../servicios/restaurants.service';
import { addRestaurant, errorHttpRestaurant, loadRestaurant, getRestaurantEffect, viewRestaurant, updateRestaurantEffect, editRestaurant, deleteRestaurant, deleteRestaurantEffect } from '../store/actions/restaurantActions';
import { Restaurant } from '../models/Restaurant';


 
@Injectable()
export class RestaurantEffects {

  addRestaurant$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadRestaurant),
    exhaustMap(action => this.restaurantService.saveRestaurant(action.restaurant)
    .pipe(
      map((res:Restaurant) => res._id),
      concatMap(id=> this.restaurantService.uploadPicture(action.image,id)
      .pipe(
        map((res:Restaurant) => addRestaurant({restaurant:res}))
      )
      ),      
      catchError(error=> of(errorHttpRestaurant()))
    )
    )   
  )
  );

  getRestaurant$ = createEffect(() => 
  this.actions$.pipe(
    ofType(getRestaurantEffect),
    exhaustMap(action => this.restaurantService.getRestaurant().pipe(
      map((restaurant:Restaurant) => viewRestaurant({restaurant}))  
    ))
  )
  
  );


  updateRestaurant$ = createEffect(() => 
  this.actions$.pipe(
    ofType(updateRestaurantEffect),
    exhaustMap(action => this.restaurantService.updateRestaurant(action.restaurant,action.id)
    .pipe(
      map((res:Restaurant) => editRestaurant({restaurant:res}))
    )
    )
  )
  )

  deleteRestaurant$ = createEffect(() => 
  this.actions$.pipe(
    ofType(deleteRestaurantEffect),
    exhaustMap(action => this.restaurantService.deleteRestaurant(action.id)
    .pipe(
      map(_ => deleteRestaurant() )
    )
    )
  )
  )


 
  constructor(
    private actions$: Actions,
    private restaurantService: RestaurantService
  ) {}
}