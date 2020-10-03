import { Component, OnInit } from "@angular/core";
import { CategoriasService } from "../../../servicios/categorias.service";
import { Category } from "../../../models/item";
import { MessageService } from "primeng/api";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  editcategoryboolean: boolean;
  categorias: any = [];
  inputCreateCategory: String;
  inputSearchCategory: String;
  createCategoryPopUpBoolean: boolean = false;
  istaxablecategory: boolean;

  currentIndex: number;
  
  constructor(
    private categoriasService: CategoriasService,
	private messageService: MessageService,
	private route: ActivatedRoute
  ) {}

  ngOnInit() {
	/* abra modal de una vez si carga desde otro componente, agregar categoria desde otros componentes */
	let textoAbrirModal =  this.route.snapshot.paramMap.get('open');
	if (textoAbrirModal === 'openPlease'){
		this.createCategoryPopUpBoolean = !this.createCategoryPopUpBoolean;
	}
    /* Get categories*/

    console.log("corre funcion");
    this.categoriasService.getCategories().subscribe((arreglo: Category[]) => {
     
      console.log("Ha llegado el arreglo desde el servidor");
      console.log(arreglo);
      this.categories = arreglo;
      /* ordenar por categorias*/
      /*   this.categorias = [
              { label: 'All cat', value: null },
              { label: 'natural juice', value: 'natural juice' },
              { label: 'smoothies', value: 'smoothies' },
              { label: 'bakery', value: 'bakery' },
              { label: 'bowls', value: 'bowls' },
              { label: 'coffee', value: 'coffee' },
              { label: 'sodas', value: 'sodas' }
            ]; */

      this.categorias = this.categories.map((cat) => {
        return { label: cat.name, value: cat.name };
      });
      this.categorias.unshift({ label: "All cat", value: null });

      console.log("aca termina");
      console.log("estas categorias son");
      console.log(this.categories);
    });
  }

  borrarCategoria(cat) {

	Swal.fire({
		title: 'Are you sure?',
		text: "If you delete the category all items associated with that category will be deleted as well!",		
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'

	  }).then((result) => {
		if (result.value) {
				// aca borra
				this.categoriasService.deleteCategory(cat._id).subscribe((el: Category) => {
					const index = this.categories.indexOf(el);
					this.categories.splice(index, 1);
					Swal.fire(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					  )
				  });
				  // ...
				  
		  
		}
	  })




















  }

  updateCat(cat) {



	Swal.fire({
		title: 'Are you sure?',
		html: "<h1>Si cambias esta categoria todos los productos asociados con estas categorias cambiaran automaticamente</h1>",		
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si Cambiar!'
	}).then(result =>{
		if (result.value){

			
			this.categoriasService.updateCategory(cat._id, cat).subscribe();
			this.editcategoryboolean = false;
			this.messageService.add({
			  severity: "success",
			  summary: "categoria actualizada",
			});

		}
	})






	







  }

  onSaveCategory() {
    const objEnviar = {
      name: this.inputCreateCategory,
      taxable: this.istaxablecategory,
    };

    this.categoriasService.addCategory(objEnviar).subscribe(
      (el: Category) => {
        if (el) {
          this.messageService.add({
            severity: "success",
            summary: "Categoria " + el.name + " guardada con exito",
          });
        }
        /* quite el popUp*/
        this.createCategoryPopUpBoolean = false;
        this.categories.push(el);
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Bad Request",
          text: error.error,
        });
      }
    );
  }
}
