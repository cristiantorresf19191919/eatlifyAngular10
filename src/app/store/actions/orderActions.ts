import { createAction, props } from '@ngrx/store';
import { OrderData } from 'src/app/models/order.model';

export const loadOrder = createAction(
    "[Dashboard Component] socket",
    props<{order:OrderData}>()
)
export const loadOrderEffect = createAction(
    "[Dashboard Component] socket",
    props<{order:OrderData}>()
)