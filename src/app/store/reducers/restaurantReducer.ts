import {
  Action,
  createReducer,
  on,
  createSelector,
  createFeatureSelector,
} from "@ngrx/store";
import { Restaurant } from "src/app/models/Restaurant";
import {
  addRestaurant,
  deleteRestaurant,
  viewRestaurant,
  editRestaurant,
} from "../actions/restaurantActions";

export interface RestaurantState {
  _id?: string;
  name: string;
  address: string;
  description: string;
  phone: string;
  productos: Array<any>;
  ventas: Array<any>;
  image: Object;
}

export const restaurantInitialState: RestaurantState = {
  name: " ",
  address: " ",
  description: " ",
  phone: " ",
  productos: null,
  ventas: null,
  image: null,
};
const _restaurantReducer = createReducer(
  restaurantInitialState,
  on(addRestaurant, (state, { restaurant }) => ({ ...state, ...restaurant })),
  on(viewRestaurant, (state, { restaurant }) => ({ ...state, ...restaurant })),

  on(editRestaurant, (state, { restaurant }) => ({ ...state, ...restaurant })),
  on(deleteRestaurant, (state) => ({
    name: " ",
    address: " ",
    description: " ",
    phone: " ",
    productos: null,
    ventas: null,
    image: null,
  }))
);

export function restaurantReducerF(
  state: RestaurantState | undefined,
  action: Action
) {
  return _restaurantReducer(state, action);
}

export const getRestaurantState = createFeatureSelector<RestaurantState>(
  "restaurant"
);

export const getRestaurantName = createSelector(
  getRestaurantState,
  (state: RestaurantState) => state.name
);

export const getRestaurantId = createSelector(
  getRestaurantState,
  (state: RestaurantState) => state._id
)
