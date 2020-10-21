import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { Item, Category } from "src/app/models/item";
import { HttpErrorResponse } from "@angular/common/http";
import { DeliveryService } from "src/app/servicios/delivery.service";
import { ProductosService } from "src/app/servicios/productos.service";
import { DeliveryTransferDataService } from "src/app/servicios/delivery-transfer-data.service";
import { CategoriasService } from "src/app/servicios/categorias.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Utilities } from "../../Utilties";
import Swal from "sweetalert2";
import { Observable, Subject } from 'rxjs';
import { State } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { getRestaurantId } from 'src/app/store/reducers/restaurantReducer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  @ViewChild("pictureContainer", { static: false })
  pictureContainer: ElementRef;
  @Output() CerrarPopUp = new EventEmitter();

  name_CreateProduct: string;
  price_CreateProduct: number;
  description_CreateProduct: string;
  category_CreateProduct: string;
  topProduct: boolean = false;
 /* img to go */
 selectedImage: File;
 imgUrl: any;
 loading: boolean = false;
 categories: Category[];
 fileLoaded: boolean = false;
 addonProduct:boolean = false;
 private $subscriber = new Subject<any>();
 restaurantId:string="";

 constructor(
  private deliveryService: DeliveryService,
  private productosService: ProductosService,
  private deliveryTransferService: DeliveryTransferDataService,
  private categoriasService: CategoriasService,
  private router: Router,
  private renderer: Renderer2,
  private store: Store<State>
) {}
  private onDestroy$:Subject<void> = new Subject<void>();
  restaurantId$:Observable<string> = this.store.pipe(
    takeUntil(this.onDestroy$),
    select(getRestaurantId)
  );

  public ngOnDestroy(): void {
    this.onDestroy$.next();    
    this.onDestroy$.complete();    
  }

  ngOnInit() {
    this.restaurantId$.subscribe((id:string)=>this.restaurantId = id);
    this.categoriasService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories.slice();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  registrar() {
    // TODO
    this.loading = true;
    //preparando el objeto para enviar
    const item: Item = {
      name: this.name_CreateProduct,
      price: this.price_CreateProduct,
      description: this.description_CreateProduct,
      category: this.category_CreateProduct,
      topProduct: this.topProduct,
      addonProduct: this.addonProduct,
      restaurant:this.restaurantId
    };

    // enviando el item a la base de datos
    this.productosService.addProduct(item).subscribe(
      (response: Item) => {
        if (response) {
          let id = response._id;
          this.deliveryService.SubirFoto(this.selectedImage, id).subscribe();
          setTimeout(() => {
            Swal.fire(
              "exito",
              `el producto ${item.name} se ha agregado con exito`,
              "success"
            );
            this.CerrarPopUp.emit("");
            this.loading = false;
          }, 2000);
          this.resetForm();
          // this.router.navigate(['/dashboard/parentProducts/products']);
        }
      },
      (error: HttpErrorResponse) => {
     
        Swal.fire("error", `${item.name} > ${error.error.msg} `, "warning");
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
      this.$subscriber.next(this.imgUrl);

      
    };
    /* para reutilizarla en cuando de salvar al boton y hacer el post */
    this.selectedImage = imageInput.files[0];
    this.fileLoaded = true;
    console.log("imageInput.value");
    console.log(imageInput.value);
  }

  addNewCategory() {
    Utilities.CreateCategory(this.router);
  }

  //  
  //  @ViewChild("pictureContainer", { static: false })                                                   pictureContainer: ElementRef;
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    // cuando cambio la imagen
    // this.$subscriber.next()
    this.$subscriber.asObservable().subscribe(img =>{
      if (img) {
        this.pictureContainer.nativeElement.style.backgroundImage = `url(${this.imgUrl})`;
        this.pictureContainer.nativeElement.classList.add("yes-picture");
      }

    })
  
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.$subscriber.asObservable().subscribe(img =>{
      if (img) {
        this.pictureContainer.nativeElement.style.backgroundImage = `url(${this.imgUrl})`;
      }

    })
  }

  resetForm(){

    this.name_CreateProduct = "";
    this.price_CreateProduct= 0;
    this.description_CreateProduct = "";
    this.category_CreateProduct = "";
    this.topProduct = false;
    this.addonProduct = false;
    this.selectedImage = null;
    this.fileLoaded = false;
    this.imgUrl = null;

  }
}
