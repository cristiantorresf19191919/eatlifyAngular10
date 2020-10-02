import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { RestaurantService } from "../../servicios/restaurants.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Restaurant } from "../../models/Restaurant";
import { validateForm } from "./validateInput";

import { Observable } from "rxjs";
import { RestaurantTypes } from "../redux/reducers/restaurantTypes";
import { select, Store } from "@ngrx/store";

import { Utilities } from "../parent-products/Utilties";
import { State } from "src/app/store";
import { decrement, increment, reset } from "src/app/store/actions/countAction";
import { updateRestaurantEffect } from '../../store/actions/restaurantActions';
import {
  addRestaurant,
  deleteRestaurant,
  editRestaurant,
  viewRestaurant,
} from "src/app/store/actions/restaurantActions";
import {
  loadRestaurant,
  deleteRestaurantEffect,
} from "../../store/actions/restaurantActions";
import { bounceInDownOnEnterAnimation, zoomInLeftOnEnterAnimation, zoomInRightOnEnterAnimation } from 'angular-animations';

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
  animations:[zoomInLeftOnEnterAnimation({delay:600}), zoomInRightOnEnterAnimation()]
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  count$: Observable<number>;

  name: string;
  address: string;
  description: string;
  phone: string;


  restaurantDataHasLongName: boolean = false;

  @ViewChild("sidebar", { static: false }) sideBar: ElementRef;
  imgUrl: any;
  selectedImage: any;
  loading: boolean = false;
  loading_text: string = "determinate";
  restaurantData: Restaurant = null;
  onedit: boolean = false;
  public restaurant: Restaurant = new Restaurant();

  ngAfterViewInit(): void {
    // outputs `I am span`
    // pone la side bar bien ajustada cuando se hace scroll down
    // side-bar
    // inspeccione y busque el padre que hace el scroll y detecta los cambios

    let main = document.querySelector(".mat-drawer-content");
    var prevScrollpos = main.scrollTop;
    console.log("prevScrollpos = ", prevScrollpos);
    main.addEventListener(
      "scroll",
      () => {
        var currentScrollPos = main.scrollTop;
        console.log("currentScrollPos = ", currentScrollPos);
        if (prevScrollpos > currentScrollPos) {
          this.sideBar.nativeElement.style.top = "10%";
        } else {
          this.sideBar.nativeElement.style.top = "0";
        }
        prevScrollpos = currentScrollPos;
      },
      true
    );
  }

  tiles = [
    { text: "One", cols: 3, rows: 1, color: "lightblue" },
    { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
    { text: "Three", cols: 1, rows: 1, color: "lightpink" },
    { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" },
  ];

  html = `
  <mat-grid-list cols="4" rowHeight="100px">
  <mat-grid-tile
      *ngFor="let tile of tiles"
      [colspan]="tile.cols"
      [rowspan]="tile.rows"
      [style.background]="tile.color">
    {{tile.text}}
  </mat-grid-tile>
</mat-grid-list>

  `;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private utilities: Utilities,
    private store: Store<State>
  ) {
    //connect the count$ stream to the store's count state
    this.count$ = store.pipe(select("count"));
  
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  ngOnInit() {
    this.getRestaurant();
    //ocultar el icono de reciviendo pedidos
    this.utilities.setCambioRuta(true);

    this.store.pipe(select("restaurant")).subscribe((state) => {
      console.log("restaurant state ", state);
      this.restaurantData = state as Restaurant;
      this.restaurant = state as Restaurant;
      this.restaurantDataHasLongName =
        this.restaurantData.name.length > 1 ? true : false;
    });
  }

  getRestaurant() {
    this.restaurantService.getRestaurant().subscribe(
      (res: any) => {
        console.log("respuesta del servidor");
        console.log(res);
        this.restaurantData = res[0];

        if (res.length > 0) {
          this.restaurant = this.restaurantData;
          this.store.dispatch(viewRestaurant({ restaurant: this.restaurant }));
          this.name = this.restaurant.name;
          this.address = this.restaurant.address;
          this.description = this.restaurant.description;
          this.phone = this.restaurant.phone;
        }
      },
      (error: HttpErrorResponse) => {
        console.log("error");
        console.log(error);
      }
    );
  }

  onFileSelected(imageInput: any) {
    const file: File = imageInput.files[0];
    /* cargue instantaneamente la imagen que sube del input */
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (_event) => {
      // la imagen que refresca en la vista
      this.imgUrl = fileReader.result;
      // this.$subscriber.next(this.imgUrl);
    };
    /* para reutilizarla en cuando de salvar al boton y hacer el post */
    this.selectedImage = imageInput.files[0];

    // this.fileLoaded = true;
    console.log("imageInput.value");
    console.log(imageInput.value);
  }

  registrarRestaurante() {
    // TODO
    this.loading = true;
    this.loading_text = "indeterminate";
    setTimeout(() => {
      this.loading = false;
      this.loading_text = "indeterminate";
    }, 1000);
    console.log(this.restaurant);
    this.restaurant = {
      name: this.name,
      address: this.address,
      description: this.description,
      phone: this.phone,
    };

    if (validateForm(this.restaurant)) {
      this.store.dispatch(
        loadRestaurant({
          restaurant: this.restaurant,
          image: this.selectedImage,
        })
      );
      /*  this.restaurantService.saveRestaurant(this.restaurant).subscribe(
        (res) => {
          this.restaurantData = res;
          this.restaurant = this.restaurantData;   

              
          this.restaurantService.uploadPicture(this.selectedImage, this.restaurant._id)
          .subscribe((res:Restaurant)=>{
           
            this.store.dispatch(addRestaurant({restaurant:res}));
            this.restaurantData = res;
            this.restaurant = this.restaurantData;   

          })
        },
        // toca subir la foto 
        (error: HttpErrorResponse) => {
          console.log("error");
          console.log(error);
        }
      ); */
    }
  }
  editRestaurante() {
    this.onedit = !this.onedit;
  }

  deleteRestaurante() {
    Swal.fire({
      title: "Esta seguro que desea eliminar los datos de su restaurante?",
      confirmButtonText: `Eliminar`,
      showCancelButton: true,

      icon: "warning",
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.value) {
        // eliminar todo
       
        this.store.dispatch(
          deleteRestaurantEffect({
            id:this.restaurant._id
          })
        );
        Swal.fire(
          "Se ha eliminado tus datos",
          "Puedes volver a crear los datos",
          "info"
        );
      } else if (result.value) {
        Swal.fire("No se ha eliminado nada", "", "info");
      }
    });
  }

  updateRestaurant() {
    // to do
    // loading effect
    this.loading = true;
    this.loading_text = "indeterminate";

    // peticion
    let id = this.restaurant._id;
    this.restaurant = {
      name: this.name,
      address: this.address,
      description: this.description,
      phone: this.phone,
      _id: id,
    };

      // quitar loading
      setTimeout(() => {
        this.loading = false;
        this.loading_text = "indeterminate";
      }, 1000);

       this.store.dispatch(updateRestaurantEffect({
        restaurant:this.restaurant, id:this.restaurant._id
      }))

      
  
  }
}
