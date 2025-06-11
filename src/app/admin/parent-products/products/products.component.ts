import { Component, OnInit, } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { zoomInLeftOnEnterAnimation } from 'angular-animations';
import { Category } from 'src/app/models/item';
import { Utilities } from '../Utilties';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/servicios/delivery.service';



@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.scss' ],
	animations: [ zoomInLeftOnEnterAnimation() ]
})
export class ProductsComponent implements OnInit {


	admin: string;
	name: string;
	price: number;
	description: string;
	category: string;
	info: boolean = false;
	products: any = [];
	cols = [];
	categories: Category[] = [];
	clonedProduct = {};
	switchPaginator: boolean = true;
	topProduct: boolean = false;
	categorias: any = [];
	constructor(
		private productsService: ProductosService,
		private messageService: MessageService,
		private categoriasService: CategoriasService,
		public router: Router,
		private utilites:Utilities,
		private deliveryService:DeliveryService

	) {}



	ngOnInit() {

		//ocultar recibiendo pedidos
		this.utilites.setCambioRuta(true);

		// get categorias para cargar el select

		console.log("corre funcion");
		this.categoriasService.getCategories().subscribe((category: Category[]) => {
		  console.log("Ha llegado el arreglo desde el servidor", category);
		  console.log(category);
		  this.categories = category;
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

		  this.categorias = this.categories.map((cat) => ({ label: cat.name, value: cat.name }));
		  this.categorias.unshift({ label: "All cat", value: null });

		  console.log("aca termina");
		  console.log("estas categorias son");
		  console.log(this.categories);
		});


		this.admin = localStorage.getItem('admin');
		this.cols = [
			{ field: 'name', header: 'Name', width: '50%' },
			{ field: 'price', header: 'Price', width: '20%', styleClass: 'text-right' },
			{ field: 'category', header: 'Category', width: '20%', styleClass: 'text-center' },
		];

		/* get products from server */
		this.productsService.getProducts().subscribe(
			(products) => {
				console.log({products});
				this.products = products;
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				Utilities.errorDeConexion();
			}
		);
	}
	registrar() {
		this.info = true;
		const producto = {
			name: this.name.trim(),
			price: this.price,
			description: this.description,
			category: this.category,
			topProduct: this.topProduct
		};
		if (!producto.price || !producto.category) {
			Swal.fire('price OR category is missing');
			return;
		}
		this.productsService.addProduct(producto).subscribe(
			(data) => {
				if (data) {
					this.products.push(data);
					console.log(this.products);
					this.name = '';
					this.price = null;
					this.description = '';
					this.category = '';
					this.messageService.add({
						severity: 'success',
						summary: 'producto {' + producto.name + '} ha sido agregado con exito',
						detail: 'en la base de datos'
					});
				}
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				Swal.fire(error.error.msg);
			}
		);
	}
	onRowEditInit(producto) {
		console.log('INICIALIZANDO ONROWINITDATA');
		console.log(producto);
	}
	onRowEditSave(product) {
		this.productsService.UpdateProduct(product).subscribe(
			(productUpdated) => {
				if (productUpdated) {
					this.messageService.add({
						severity: 'success',
						summary: 'producto {' + product.name + '} ha sido actualizado con exito',
						detail: 'en la base de datos id = ' + product._id
					});
				}
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this.messageService.add({
					severity: 'error',
					summary: 'error en la comunicacion',
					detail: 'verifica tu conexion a internet'
				});
			}
		);
	}
	onRowEditCancel(producto, ri) {}

	deleteProduct(product) {
		// alert(id);
		if (this.userNotAdmin()) return;
		let id = product._id;
		Swal.fire({
			icon: 'error',
			title:
				'Are you completely SURE to delete this product  <p  style="color:orangered;display=inline>' +
				product.name +
				'</p>, no hay vuelta de hoja',
			showCancelButton: true,
			focusConfirm: false,
			confirmButtonText: 'DELETE <i class="fas fa-skull-crossbones"></i>',
			cancelButtonText: 'NO DELETE <i class="fas fa-walking"></i>',
			confirmButtonColor: '#9D0D0B',
			cancelButtonColor: '#19B600'
		}).then((result) => {
			if (result.value) {
				this.productsService.DeleteProduct(product).subscribe(
					(response) => {
						if (response) {
							this.products.splice(id, 1);
							this.products = this.products.filter((h) => h !== product);
							this.messageService.add({
								severity: 'info',
								summary: 'producto {' + product.name + '} eliminado',
								detail: 'en la base de datos id = ' + product._id
							});
						}
					},
					(error: HttpErrorResponse) => {
						this.messageService.add({
							severity: 'error',
							summary: 'error en la comunicacion',
							detail: 'verifica tu conexion a internet'
						});
					}
				);
			}
		});
	}
	userNotAdmin() {
		if (localStorage.getItem('user') === 'false') {
			Swal.fire({
				title: 'You have no permissions to make this actions sorry.. for more info contact Cristian please',
				icon: 'error'
			});
			return true;
		}
	}

	exportExcel() {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(this.paseDataString());
			const workbook = { Sheets: { data: worksheet }, SheetNames: [ 'data' ] };
			const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
			this.saveAsExcelFile(excelBuffer, 'primengTable');
		});
	}

	paseDataString() {
		let productos = [];
		for (let objetosProductos of this.products) {
			objetosProductos.price = objetosProductos.price.toString();
			objetosProductos._id = objetosProductos._id.toString();

			productos.push(objetosProductos);
		}
		return productos;
	}

	saveAsExcelFile(buffer: any, fileName: string): void {
		import('file-saver').then((FileSaver) => {
			let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
			let EXCEL_EXTENSION = '.xlsx';
			const data: Blob = new Blob([ buffer ], {
				type: EXCEL_TYPE
			});
			FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
		});
	}

	addCategory(): void{		
		Utilities.CreateCategory(this.router);
	}

	createNewProduct() {
		this.router.navigate(['/dashboard/parent-products/delivery']);
	}

	editProduct(product){	
		this.router.navigate(['/dashboard/parentProducts/delivery', product._id]);
	}
	
}
