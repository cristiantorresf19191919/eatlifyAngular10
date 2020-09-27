import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})

export class RestaurantTypes {
    static readonly AGREGAR_RESTAURANTE = "AGREGAR_RESTAURANTE";
    static readonly ELIMINAR_RESTAURANTE = "ELIMINAR_RESTAURANTE";
    static readonly EDITAR_RESTAURANTE = "EDITAR_RESTAURANTE";
    static readonly VER_RESTAURANTE = "VER_RESTAURANTE";
    static readonly ERROR_RESTAURANTE = "ERROR_RESTAURANTE";
} 