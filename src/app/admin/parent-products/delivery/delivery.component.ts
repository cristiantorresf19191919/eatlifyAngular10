import { Component, OnInit, HostListener } from '@angular/core';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { HttpErrorResponse } from '@angular/common/http';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { Category, Item } from 'src/app/models/item';
import { DeliveryTransferDataService } from 'src/app/servicios/delivery-transfer-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilities } from '../Utilties';
import { ProductosService } from 'src/app/servicios/productos.service';
import { delay, exhaustMap, map } from 'rxjs/operators';
import { fadeInDownOnEnterAnimation, fadeInOnEnterAnimation, rubberBandAnimation, rubberBandOnEnterAnimation } from 'angular-animations';
import { from, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  animations:[fadeInOnEnterAnimation(), fadeInDownOnEnterAnimation(),rubberBandOnEnterAnimation()]
})
export class DeliveryComponent implements OnInit {
  // insert python string here

  onEdit: boolean;
  dataSelected: Item;
  categories: any;
  selectedImage: File;
  onScroll: boolean;
  imgUrl: any;
  productSelected: any;
  categoriesArray: Category[] = [];
  loading: boolean = false;
  popUpActive: boolean = false;
  panelOpenState = false;
  percentageIncrease:number = 0;
  animatePhotoInfoBoolean:boolean = false;
  onLoadPc:boolean=false;
  selectedCategory:string;
  constructor(
    private deliveryService: DeliveryService,
    private categoriesService: CategoriasService,
    private deliveryTransferDataService: DeliveryTransferDataService,
    private router: Router,
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductosService
  ) {}
  ngOnInit() {
    this.deliveryService.getItem().subscribe(
      (product:Item) => {
        this.onEdit = true;
        this.dataSelected = product;
      },
      (error) => {
        console.error(error);
      }
    );

    this.activatedRoute.params
      .pipe(
        exhaustMap(({ product_id }) => {
          return this.productsService.getProductById(product_id);
        })
      )
      .subscribe((product:Item) => {
        this.dataSelected = product;
        this.onEdit = true;
      });

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    const title = document.getElementById('title');


    this.categoriesService.getCategories().subscribe(
      (cat: Category[]) => {
        
        this.categoriesArray = cat;
      },
      (error: HttpErrorResponse) => {
        error;
      }
    );
   
    document.getElementById('parentContainer').addEventListener(
      'scroll',
      (event: any) => {
        if (event.srcElement.scrollTop > 50) {
          this.onScroll = true;
        } else {
          this.onScroll = false;
        }
      },
      true
    );

    this.onEdit = false;
    this.dataSelected = null;

    setTimeout(() => {
      this.animatePhotoInfoBoolean = true;
    }, 1000);
  }

  onFileSelected(imageInput: any) {
    
    
    try {
      const file: File = imageInput.files[0];
      /* cargue instantaneamente la imagen que sube del input */
      const fileReader = new FileReader();
      
      fileReader.readAsDataURL(file);
      fileReader.onload = (_event) => {
        this.imgUrl = fileReader.result;
        
      };
      /* para reutilizarla en cuando de salvar al boton y hacer el post */
      
      this.selectedImage = imageInput.files[0];
      
      console.log('imageInput.value');
      console.log(imageInput.value);
    } catch (error) {
      console.log('exploto la aplicacion');
      console.log(error);
    }
  }

  saveEdition(){
    const id = this.dataSelected._id;
 
    this.deliveryService.updateProduct(this.dataSelected,id)
    .pipe(
      exhaustMap((item:Item)=>{
        if (this.selectedImage){
          return this.deliveryService.SubirFoto(this.selectedImage,item._id).pipe(
            delay(1000)
          )       
        } else {
          return from<Observable<Item>>(of(item));
        }
       
      }        
      )
    ).subscribe((data:Item)=>{
      Swal.fire({
        title:"Ok",
        text:'Producto actualizado con exito',
        icon:'success'
      })
      console.log('todo bien mijo ',data);  
    },(putoError:HttpErrorResponse)=>console.log(putoError.message));
  }
  
  updateProduct(product) {
    this.loading = true;
    /* subir foto */
    const productSelected = this.productSelected || product;
    this.selectedImage;
   
    
    this.deliveryService
      .SubirFoto(this.selectedImage, productSelected._id)
      .subscribe(
        (data:Item) => {
          this.dataSelected = data;

          this.imgUrl = undefined;

          // emitir evento para actualizar la foto abajo automaticamente
        },
        (error: HttpErrorResponse) => {}
      );
    /*actualizar el producto desoues de 2 seg */
    setTimeout(() => {
      this.deliveryService.updateProduct(product, product._id).subscribe(
        (data) => {
          console.log('toDo');
          console.log(data);
          this.utilities.notificarUpload.emit(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      this.loading = false;
    }, 2000);
  }
  uploadPicOnly(product) {}
  ngOnChanges() {
    /* no se quede pegado */
    this.dataSelected = null;
    this.imgUrl = undefined;
  }
  onCategorySelected(category: Category) {
    this.deliveryTransferDataService.setCategoryData(category.name);
  }

  onCreateProductPopUp() {
    this.popUpActive = true;
  }

  onCerrarPopUpFromChild(event) {
    let bol = Boolean(event);
    this.popUpActive = bol;
  }
  //reenviar al compo categoria
  crearMuevaCategoria() {
    Utilities.CreateCategory(this.router);
  }

  removePicture(){
   
    this.imgUrl = null;
    // this.onLoadPc = true;
    this.dataSelected.image = null;
    
  }
  // cat 1 for each element
  // cat 2 backend
  compararCategoria(c1: Category, c2: Category) {
    /* if (cat1 == undefined || cat2 == undefined){
		return true
	  }
	  // aca muestra automaticamente la lista que viene del backend
	  return cat1 == null ||
		cat2 == null     
		? false
    : cat1.name == cat2.name; */

    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
}
