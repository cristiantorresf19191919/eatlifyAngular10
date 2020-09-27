import { createAction, props } from '@ngrx/store';
import { OrderData } from 'src/app/admin/dashboard/dashboard.component';

export const loadOrder = createAction(
    "[Dashboard Component] socket",
    props<{order:OrderData}>()
)
export const loadOrderEffect = createAction(
    "[Dashboard Component] socket",
    props<{order:OrderData}>()
)