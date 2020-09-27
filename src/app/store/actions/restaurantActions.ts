import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../../models/Restaurant';

export const loadRestaurant = createAction(
    "[Restaurant Component] load RestaurantEffect",
    props<{restaurant:Restaurant, image: any}>()
);

export const getRestaurantEffect = createAction(
    "[Restaurant Component] get RestaurantEffect",    
);

export const updateRestaurantEffect = createAction(
    "[Restaurant Component] update RestaurantEffect", 
    props<{restaurant:Restaurant, id: string}>()

);

export const deleteRestaurantEffect = createAction(
    "[Restaurant Component] delete RestaurantEffect",    
    props<{id:string}>()
);

export const viewRestaurant = createAction(
    "[Restaurant Component] view Restaurant",
    props<{restaurant:Restaurant}>()
)

export const addRestaurant = createAction(
    "[Restaurant Component] Save RestaurantForm",
    props<{restaurant:Restaurant}>()
)

export const editRestaurant = createAction(
    "[Restaurant Component] Edit RestaurantForm",
    props<{restaurant:Restaurant}>()
)

export const deleteRestaurant = createAction(
    "[Restaurant Component] Delete RestaurantForm",
  
)
export const errorHttpRestaurant = createAction(
    "[Restaurant Component] LoadError Restaurant",
  
)


