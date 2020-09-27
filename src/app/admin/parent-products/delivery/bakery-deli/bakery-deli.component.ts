import { Component, OnInit } from "@angular/core";
import { DeliveryService } from "src/app/servicios/delivery.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DeliveryTransferDataService } from "src/app/servicios/delivery-transfer-data.service";
import { Utilities } from "../../Utilties";
import { Item } from "../../../../models/item";
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: "app-bakery-deli",
  templateUrl: "./bakery-deli.component.html",
  styleUrls: ["./bakery-deli.component.scss"],
})
export class BakeryDeliComponent implements OnInit {
  bakeryProducts: Item[];
  loading = false;
  constructor(
    private deliverService: DeliveryService,
    private deliveryTransferData: DeliveryTransferDataService,
    private utilities: Utilities,
    private productsService: ProductosService,
  ) {}

  ngOnInit() {

    //cargar todos los productos para no dejar en blanco la pantalla
    this.productsService.getProducts().subscribe((products:Item[])=>{
      if(products){
        this.bakeryProducts = products;
      }
    })

    //para actualizar la foto automaticamente que se carga despues de salvar
    // me toca buscar el objeto que tenga el mismo id
    // y luego cambiarlo y meterlo wow
    this.utilities.notificarUpload.subscribe((item: Item) => {
      let productoACambiar = this.bakeryProducts.find(
        (eachItem) => eachItem._id == item._id
      );
      let indice = this.bakeryProducts.indexOf(productoACambiar);
      this.bakeryProducts.splice(indice, 1);
      this.bakeryProducts.unshift(item);
    });

    this.deliveryTransferData.getCategoryData().subscribe((category) => {
      this.loading = true;
      this.deliverService.getProducts(category).subscribe(
        (bakeryProductsServer: Item[]) => {
          setTimeout(() => {
            this.loading = false;
          }, 100);
          console.log("bakery products");
          console.log(bakeryProductsServer);

          if (bakeryProductsServer) {
            this.bakeryProducts = bakeryProductsServer;
            
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    });
  }
  pasarEvento(item) {
    this.deliverService.setItem(item);
  }
}
