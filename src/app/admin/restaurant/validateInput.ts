import { Restaurant } from '../../models/Restaurant';
import Swal from 'sweetalert2';
export function validateForm (res:Restaurant): boolean{
    if (!res.address){
        Swal.fire('por favor llenar la direccion');
        return;
    } 
    else if ( !res.name){
        Swal.fire('te falto llenar el nombre  ');
        return;
        
    }
    else if ( !res.phone){
        Swal.fire('te falto llenar el telefono  ');
        return;
        
    }
  
    return true;
}