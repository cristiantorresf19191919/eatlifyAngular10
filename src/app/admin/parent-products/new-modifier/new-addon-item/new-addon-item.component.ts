import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, delay, exhaustMap, map, takeUntil } from 'rxjs/operators';
import { Category, Item } from 'src/app/models/item';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { DeliveryService } from 'src/app/servicios/delivery.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-addon-item',
  templateUrl: './new-addon-item.component.html',
  styleUrls: ['./new-addon-item.component.scss'],
})
export class NewAddonItemComponent implements OnInit {
  onClose: boolean = false;
  showSideBarBoolean: boolean = false;
  categories: Category[] = [];
  selectedImage: File;
  product: Item = new Item();
  imgUrl: any;
  ondestroy$: Subject<void> = new Subject<void>();
  @Input('showSideBar') showSideBar: boolean;
  @Output() closeSideBar = new EventEmitter<void>();
  constructor(
    private categoryService: CategoriasService,
    private deliveryService: DeliveryService,
    private productsService: ProductosService
  ) {
    this.showSideBarBoolean = this.showSideBar;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const PropName in changes) {
      const changeProp = changes[PropName];
      const to = JSON.stringify(changeProp.currentValue);
      console.log('testing');
      console.log(changes['showSideBar']);
      this.showSideBarBoolean = changeProp.currentValue as boolean;
    }
  }

  close() {
    this.onClose = !this.onClose;
    this.showSideBarBoolean = false;
    this.closeSideBar.emit();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.ondestroy$))
      .subscribe((res: Category[]) => {
        this.categories = res;
      });
  }



  registrar() {
    // TODO
    
    let obs: Observable<any> = this.productsService
      .addProduct(this.product)
      .pipe(
        delay(2000),
        takeUntil(this.ondestroy$),
        exhaustMap((item: Item) =>
          this.deliveryService
            .SubirFoto(this.selectedImage, item._id)
            .pipe(
              delay(3000),              
              catchError(err => {
                console.log('error');
                throw err;
              })
              
              )
        )
      );

    obs.subscribe((_)=>{
      Swal.fire(
        'exito',
        `el producto ${this.product.name} se ha agregado con exito`,
        'success'
      );
      this.resetForm();
    },  (error: HttpErrorResponse) => {
      Swal.fire(
        'error',
        `${this.product.name} > ${error.message} `,
        'warning'
      );
      console.log(error);
    });

   
  }

  onFileSelected(imageInput: any) {
    
    const file: File = imageInput.files[0];
    /* cargue instantaneamente la imagen que sube del input */
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (_event) => {
      // la imagen que refresca en la vista
      this.imgUrl = fileReader.result;
    };
    /* para reutilizarla en cuando de salvar al boton y hacer el post */
    this.selectedImage = imageInput.files[0];
  
    console.log('imageInput.value');
    console.log(imageInput.value);
  }

  ngOnDestroy(): void {
    this.ondestroy$.next();
    this.ondestroy$.complete();
  }

  resetForm() {
    this.imgUrl = null;
    this.product = new Item();
  }
  removePicture(){
    this.imgUrl = null;
    this.showSideBarBoolean = false;

  }
}
