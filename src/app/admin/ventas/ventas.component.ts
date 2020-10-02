import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
  OnChanges,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductosService } from "src/app/servicios/productos.service";
import Swal from "sweetalert2";
import { MessageService, SortEvent } from "primeng/api";
import { PreventasService } from "src/app/servicios/preventas.service";
import { VentasService } from "src/app/servicios/ventas.service";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

import { Item } from "src/app/models/item";
import { VentasJorunalService } from "src/app/servicios/ventas-jorunal.service";
import { VentasSocketService } from "../ventas-socket/ventas-socket.service";
import { Subscription, of, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { BuscarService } from "src/app/servicios/buscar.service";
import {
  fadeInDownOnEnterAnimation,
  bounceInDownOnEnterAnimation,
  zoomInLeftOnEnterAnimation, zoomOutLeftOnLeaveAnimation
} from "angular-animations";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CategoriasService } from "src/app/servicios/categorias.service";
import { Utilities } from "../parent-products/Utilties";

interface Categories {
  name: String;
}

@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.scss"],
  animations: [
    fadeInDownOnEnterAnimation(),
    bounceInDownOnEnterAnimation(),
    zoomInLeftOnEnterAnimation(),
    zoomOutLeftOnLeaveAnimation()
  ],
})
export class VentasComponent implements OnInit, OnChanges {
  /* Accediento al input para forzar el autofocus */
  admin: string;
  products: any = [];
  product: any = {};
  categorias: any;
  cols: any = [];
  colsVentas: any = [];
  change: number;
  quantity: number = 1;
  priceInitial: number;
  moneyReceivedInitial: number;
  giveChange: number;
  displayDialog: boolean = false;
  newProduct: boolean;
  selectedProduct: any;
  productsSold: any = [];
  totalSale: number = 0;
  prodcutoVendido: any = {};
  autoSuma: number = 0;
  // preventas
  arregloproducrosvendidos: any = [];
  totalquantity: number = 0;
  facturaIdFaker: string;
  arrayFacturaIdFaker = [];
  booleanDecision: boolean = false;
  customerNumberToTrack: number = 0;
  switchPaginator: boolean = false;
  switchPaginator2: boolean = true;
  descripcionVenta: string;
  todaysdate: any;
  arregloproductostrackingtrack: any = [];
  apaguetablaproductos: boolean = false;
  arregloNumeros = [];
  nuevoarreglofiltrado = [];
  sumaporcliente: number = 0;
  sumatotalpercustomer: number = 0;
  extrafruit: number;
  extrascrub: number;
  initialpriceforsmoothies: number;
  total_price = 0;
  total_quantity = 0;
  initial_name_reduce: string = "";
  arregloNuevo = [];
  itemssubcatmenu: string;
  scrollBooleano = false;
  variableEntradaCantidad: any;
  sticky: boolean = false;
  headerMenuCopy: any;
  positionTopHeader: number;
  itemToPassToChild: any;
  itemObject: any;
  journalComponentClone: any;
  /* on scroll get sticky journal component*/
  onScroll: boolean = false;
  windowsInnerWidthLessThanBoolean = false;
  closeJournalComponent: boolean = false;
  productoShortCut: string = "";
  activateShortCutComponent: boolean = false;
  terminoaBuscar: string;
  booleanoParaQueNoAgregueProductoDosVeces: boolean = false;

  dataSearched: Observable<Item[]>;

  productoShortCutConSeparadorDeMiles: string;

  private _getVentaUnitariaSocketSubscriptor: Subscription;

  /* crea el subject que va a emitir cada palabra */
  private $searchTerms = new Subject<string>();

  @ViewChild("cantidad", { static: false })
  MiCantidadFocus: ElementRef;
  @ViewChild("menuCat", { static: false })
  divView: ElementRef;
  @ViewChild("busquedaGlobal", { static: false })
  busquedaGlobalInput: ElementRef;

  constructor(
    private productsService: ProductosService,
    private messageService: MessageService,
    private preventasService: PreventasService,
    private ventaService: VentasService,
    private router: Router,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private ventasJournalService: VentasJorunalService,
    private ventasSocketService: VentasSocketService,
    private buscadorServicio: BuscarService,
    private categoriasService: CategoriasService,
    private utilities: Utilities
  ) {}

  public handleScrollEvent() {
    alert("boom evento");
  }

  copiaSeguraProductosParaEnviar: [Item];

  ngOnChanges() {}

  ngOnInit() {
    //ocultar icono y estado de reciviendo pedidos
    this.utilities.setCambioRuta(true);

    /* Dynamic categories*/

    this.categoriasService.getCategories().subscribe((back: Categories[]) => {
      /* ordenar por categorias y mostrar select en la columna categorias */
      /* this.categorias = [
			{ label: 'coffee', value: 'coffee' },
			{ label: 'bakery', value: 'bakery' },
			{ label: 'bowls', value: 'bowls' },
			{ label: 'natural juice', value: 'natural juice' },
			{ label: 'smoothies', value: 'smoothies' }
    ]; */

      this.categorias = back.map((cat) => {
        return { label: cat.name, value: cat.name };
      });
      this.categorias.unshift({ label: "All cat", value: null });
    });
    let audio = new Audio();
    console.log(window.innerWidth);
    if (window.innerWidth < 1250) {
      this.windowsInnerWidthLessThanBoolean = true;
    } else {
      this.windowsInnerWidthLessThanBoolean = false;
    }

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.todaysdate = date;
    /*fin de fecha actual */
    this.admin = localStorage.getItem("admin");
    this.itemObject = [
      { hello: "how are you" },
      { hello: "how are you" },
      { hello: "how are you" },
      { hello: "how are you" },
      { hello: "how are you" },
      { hello: "how are you" },
    ];
    /* Busqueda Global Productos*/
    this.cols = [
      { field: "name", header: "name" },
      { field: "price", header: "price" },
      { field: "category", header: "category" },
      { field: "description", header: "description" },
    ];
    /* busqueda global de Venta de productos*/
    this.colsVentas = [
      { field: "name", header: "Name" },
      { field: "price", header: "Price" },
      { field: "category", header: "Category" },
      { field: "quantity", header: "Quantity" },
      { field: "date", header: "Date" },
    ];

    /* Obtener los productos de primerazo */
    this.productsService.getProducts().subscribe(
      (products: [Item]) => {
        console.log("lo que llega del servidor");
        console.log(products);
        this.products = products;
        this.copiaSeguraProductosParaEnviar = products;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Utilities.errorDeConexion();
      }
    );
    /* Mostrar la tabla de productos vendidos de primerazo GET PREVENTAS  */
    this.preventasService.verVentas().subscribe(
      (preventas) => {
        this.arregloproducrosvendidos = preventas;
        console.log(preventas);
        console.log("obteniendo productos vendidos de la base de datos");

        this.arregloproducrosvendidos.map((products) => {
          this.autoSuma += products.price;
        });
        this.arregloproducrosvendidos.map((products) => {
          this.totalquantity += products.quantity;
        });
      },
      (error: HttpErrorResponse) => {
        Utilities.errorDeConexion();
      }
    );
  }

  ngAfterViewInit() {
    /* toca pasar esa mierda para que la agarre despues de que lea este pinche hook */
    // this.headerMenuCopy = this.divView;
    /* leyendo el evento scroll */
    /* document.addEventListener(
			'scroll',
			(event: any) => {
				if (event.srcElement.scrollTop > this.headerMenuCopy.nativeElement.offsetTop + 300) {
					this.busquedaGlobalInput.nativeElement.classList.add('sticky-busqueda-global');
					this.headerMenuCopy.nativeElement.classList.add('sticky');

					this.onScroll = true;
				} else {
					this.headerMenuCopy.nativeElement.classList.remove('sticky');
					this.busquedaGlobalInput.nativeElement.classList.remove('sticky-busqueda-global');
					this.onScroll = false;
				}
			},
			true
		); */
  }

  productoSeleccionadoFromJournalComponent(product) {
    product;
    // alert(JSON.stringify(event));
    this.newProduct = false;
    this.product = this.cloneProduct(product);
    /* active el popup */
    this.displayDialog = true;
    this.priceInitial = this.product["price"];
    /* limpiiar los input*/
    this.extrafruit = null;
    this.extrascrub = null;
    /* extra fruit and scrub functions*/
    this.initialpriceforsmoothies = parseFloat(this.product["price"]);
    console.log("this.initialpriceforsmoothies = product.price;");
    console.log(this.initialpriceforsmoothies);
    this.quantity = 1;
    this.giveChange = 0;
    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((el) => (this.autoSuma += el.price));
    this.total_quantity = 0;
    this.arregloproducrosvendidos.map(
      (el) => (this.total_quantity += el.quantity)
    );
  }

  popUpGreenButton() {
    this.autoSuma = 0;
    /* llevar la cuenta de una manera elegante*/
    this.itemToPassToChild = this.cloneProduct(this.product);
    const productToGoToJournalChild = this.cloneProduct(this.product);
    productToGoToJournalChild["quantity"] = this.quantity;
    console.log("itemToPassToChild");
    console.log(this.itemToPassToChild);
    this.extrafruit = 0;
    this.extrascrub = 0;
    this.displayDialog = false;
    let quienCompro;
    if (this.facturaIdFaker) {
      quienCompro = parseInt(this.facturaIdFaker);
    }
    this.facturaIdFaker = null;
    this.booleanDecision = !this.booleanDecision;

    /* Fechas */
    let today = new Date();
    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date = today;
    this.todaysdate = date;
    /* fin de fechas*/
    /* test*/
    this.prodcutoVendido = this.product;
    this.prodcutoVendido["quantity"] = this.quantity;
    // this.prodcutoVendido['date'] = date;
    /* borrar propiedades inecesarias */
    delete this.prodcutoVendido.description;
    delete this.prodcutoVendido._v;
    /* enviar elemento actualizado al componente journalComponent */
    this.ventasJournalService.setItemUpdated(this.prodcutoVendido);
    const currentItem = this.arregloproducrosvendidos.find(
      (el) => el._id === this.prodcutoVendido._id
    );
    const indexCurrentItem = this.arregloproducrosvendidos.indexOf(currentItem);
    this.arregloproducrosvendidos.splice(indexCurrentItem, 1);
    this.arregloproducrosvendidos.unshift(this.prodcutoVendido);

    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((el) => (this.autoSuma += el.price));
    this.total_quantity = 0;
    this.arregloproducrosvendidos.map(
      (el) => (this.total_quantity += el.quantity)
    );

    /* si y solo si se requiere categorizar por cliente */
    if (quienCompro) {
      let clonedproducto = this.cloneProduct(this.prodcutoVendido);
      clonedproducto["whocustomer"] = quienCompro;
      /*meter todo en un arreglo */
      this.arregloproductostrackingtrack.push(clonedproducto);
      console.log("arregloproductostrackingtrack");
      console.log(this.arregloproductostrackingtrack);
      /* push no funciono meter los numeros que se registraron */
      if (!this.arregloNumeros.includes(quienCompro)) {
        this.arregloNumeros.push(quienCompro);
      }
      console.log("arreglo de clientes");
      console.log(this.arregloNumeros);
      /* [1,2,3,4,5,7,6,8 ] */
      /*filtrando clientes similares */
      let nuevoArregloFiltrado = [];
      for (let i in this.arregloNumeros) {
        nuevoArregloFiltrado[i] = this.arregloproductostrackingtrack.filter(
          (obj, index) => {
            return obj["whocustomer"] === this.arregloNumeros[i];
          }
        );
      }
      /* pongalo reactivo */

      this.nuevoarreglofiltrado = nuevoArregloFiltrado;

      console.log("que cabezaso pensemos haber si funciona");
      console.log(nuevoArregloFiltrado);
    }
    console.log("COMO DEBO ENVIAR ESTE OBJETO AL BACKEND?");
    console.log(this.prodcutoVendido);
    console.log(
      "********************************************************************************"
    );
    console.log(
      "********************************************************************************"
    );
    console.log(
      "********************************************************************************"
    );
  }
  /* producto seleccionado desde show components el que tiene el grid */
  ProductoSeleccionado(event) {
    /* INtentando pasar de una el producto al componente journal*/
    this.sell(event);

    /* */
  }

  cloneProduct(c: any) {
    let clone = {};
    for (let i in c) {
      clone[i] = c[i];
    }
    return clone;
  }

  onChangeQuantity(event: any) {
    if (event.keyCode == 9) {
      //tab pressed
      let temp = this.priceInitial * parseInt(event.target.value);
      this.giveChange = this.moneyReceivedInitial - this.product["price"];
      this.product["price"] = temp;
    }

    if (event.target.value) {
      let temp = this.priceInitial * parseInt(event.target.value);
      this.giveChange = this.moneyReceivedInitial - this.product["price"];
      this.product["price"] = temp;
    }

    if (event.keyCode == "38") {
      // flecha arriba
      let temp = this.priceInitial * parseInt(event.target.value);
      this.giveChange = this.moneyReceivedInitial - this.product["price"];
      this.product["price"] = temp;
    } else if (event.keyCode == "40") {
      // flecha abajo
      let temp = this.priceInitial * parseInt(event.target.value);
      this.giveChange = this.moneyReceivedInitial - this.product["price"];
      this.product["price"] = temp;
    } else {
      let temp = this.priceInitial * parseInt(event.target.value);
      this.giveChange = this.moneyReceivedInitial - this.product["price"];
      this.product["price"] = temp;
    }
    if (this.giveChange < 0 || this.giveChange === NaN) {
      this.giveChange = 0;
    }
  }

  onReceiveMoney(event: any) {
    if (event.keyCode == "9") {
      this.giveChange = parseFloat(event.target.value) - this.product["price"];
    }

    this.moneyReceivedInitial = parseFloat(event.target.value);
    if (event.keyCode == "38") {
      // flecha arriba
      this.giveChange = parseFloat(event.target.value) - this.product["price"];
    } else if (event.keyCode == "40") {
      // flecha abajo

      this.giveChange = parseFloat(event.target.value) - this.product["price"];
    } else {
      this.giveChange = parseFloat(event.target.value) - this.product["price"];
    }
  }

  cloneproduct(product) {
    let cloned = {};
    for (let i in product) {
      cloned[i] = product[i];
    }
    return cloned;
  }

  onAddItemFromChild(item) {
    /* borrar propiedades inecesarias */
    delete item.description;
    delete item._v;

    this.ventasJournalService.setItem(item);
    /* reactivo pongalo en el arreglo para que se vea en la tabla*/
    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((product) => {
      this.autoSuma += product.price;
    });
    this.arregloproducrosvendidos.push(item);
    /* faker facturas id */
    if (this.booleanDecision) {
      this.arrayFacturaIdFaker.push(this.facturaIdFaker);
    }
    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((product) => {
      this.autoSuma += product.price;
    });
    this.totalquantity = 0;
    this.arregloproducrosvendidos.map((product) => {
      this.totalquantity += product.quantity;
    });

    /* reactivo pongalo en el arreglo para que se vea en la tabla*/
    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((products) => {
      this.autoSuma += products.price;
    });
  }
  /* Producto Seleccionado desde showproducts component*/
  sell(product) {
    this.autoSuma = 0;
    /* llevar la cuenta de una manera elegante*/
    this.itemToPassToChild = this.cloneProduct(product);
    const productToGoToJournalChild = this.cloneProduct(product);
    productToGoToJournalChild["quantity"] = this.quantity;
    console.log("itemToPassToChild");
    console.log(this.itemToPassToChild);
    this.extrafruit = 0;
    this.extrascrub = 0;
    this.displayDialog = false;
    let quienCompro;
    if (this.facturaIdFaker) {
      quienCompro = parseInt(this.facturaIdFaker);
    }
    this.facturaIdFaker = null;
    this.booleanDecision = !this.booleanDecision;

    /* Fechas */
    let today = new Date();
    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date = today;
    this.todaysdate = date;
    /* fin de fechas*/
    /* test*/

    /* prodcutoVendido este es el que envia al componente journal */
    this.quantity = 1;
    this.prodcutoVendido = product;
    this.prodcutoVendido["quantity"] = this.quantity;
    /*mandelo al hijo con el id de la venta que viene del backend para despues no tener problemas al eliminarlo */
    /* el hijo tambien se lo envia al socket */
    this.ventasJournalService.setItem(this.prodcutoVendido);
    /* faker facturas id */
    if (this.booleanDecision) {
      this.arrayFacturaIdFaker.push(this.facturaIdFaker);
    }
    this.calcularSumaTotalyCantidad();
  }

  updateChartFromJournalCompOnReady(data) {
    this.arregloproducrosvendidos = data;
    this.calcularSumaTotalyCantidad();
  }

  onDeleteItemFromChild(item) {
    const ventaId = item._id;
    this.autoSuma = 0;
    this.ventasSocketService.deleteItem(item);
    this.arregloproducrosvendidos.map((product) => {
      this.autoSuma += product.price;
    });
    const index = this.arregloproducrosvendidos.indexOf(item);
    this.arregloproducrosvendidos.splice(index, 1);
    this.autoSuma = 0;
    this.arregloproducrosvendidos.map((products) => {
      this.autoSuma += products.price;
    });
    this.totalquantity = 0;
    this.arregloproducrosvendidos.map((products) => {
      this.totalquantity += products.quantity;
    });
  }

  deleteProductSold(product, id_del_producto) {
    Swal.fire({
      icon: "error",
      title: "Are you sure you wanna delete this sell",
      html:
        '<p style="font-size:25px"> Product : <b style="color: orangered;">' +
        product.name +
        '</b> Quantity : <b style="color: orange;">' +
        product.quantity +
        '</b> Price : <b style="color: orangered;">' +
        product.quantity +
        "</b></p>",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'DELETE <i class="fas fa-skull-crossbones"></i>',
      cancelButtonText: 'NO DELETE <i class="fas fa-walking"></i>',
      confirmButtonColor: "#19B600",
      cancelButtonColor: "#9D0D0B",
    }).then((result) => {
      if (result.value) {
        this.preventasService.borrarVenta(product._id).subscribe(
          (deleted) => {
            this.messageService.add({
              severity: "success",
              summary: "producto {" + product.name + "} eliminado",
              detail: "en la base de datos id = " + product._id,
            });
            console.log("this.arregloproducrosvendidos");
            console.log(this.arregloproducrosvendidos);
            this.arregloproducrosvendidos.splice(id_del_producto, 1);
            this.autoSuma = 0;
            this.arregloproducrosvendidos.map((products) => {
              this.autoSuma += products.price;
            });
            this.totalquantity = 0;
            this.arregloproducrosvendidos.map((products) => {
              this.totalquantity += products.quantity;
            });
          },
          (error: HttpErrorResponse) => {
            Swal.fire(error.error);
          }
        );
      }
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then((FileSaver) => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.paseDataString());
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "primengTable");
    });
  }

  paseDataString() {
    let productos = [];
    for (let objetosProductos of this.arregloproducrosvendidos) {
      objetosProductos.price = objetosProductos.price.toString();
      objetosProductos.quantity = objetosProductos.quantity.toString();
      objetosProductos._id = objetosProductos._id.toString();
      objetosProductos.date = objetosProductos.date.toString();
      productos.push(objetosProductos);
    }
    return productos;
  }

  customerSelected(event) {
    console.log(event.target.value);
  }
  /* funcioon que pasa desde el html calculando la suma de cada cliente*/
  totalsumpercust(productArray) {
    console.log(productArray);
    let sma = 0;
    productArray.map((product) => {
      sma += product.price;
    });
    /* return productArray.reduce((ac,vl)=>{
      return ac.price + vl.price;
    }); */
    return sma;
  }

  sendSaleOrganized() {
    console.log("arreglo original");
    console.log(this.arregloproducrosvendidos);
    /* ["asd","sdsad","ada"] */
    let arregloNombres = [];
    /* [
      [{name:'igual'},{name:'igual'}],
      [{name:'igual'},{name:'igual'}],
      [{name:'igual'},{name:'igual'}],
      [{name:'igual'},{name:'igual'}],
      [{name:'igual'},{name:'igual'}],
      [{name:'igual'},{name:'igual'}],
    ]*/
    /* arreglo con el nombre de los productos repetidos*/
    for (let i in this.arregloproducrosvendidos) {
      if (!arregloNombres.includes(this.arregloproducrosvendidos[i]["name"])) {
        arregloNombres[i] = this.arregloproducrosvendidos[i]["name"];
      }
    }
    console.log("arregloNombres");
    console.log(arregloNombres);
    /* ["Empanadas","Arepa","Banana"] */
    let arregloConArregloNombresRepetidos = [];
    /* Pilas filter produce un arreglo nuevo y corre todo un arreglo en una sola linea*/

    // retorna un arreglo con todos los arreglos que tengan el mismo nombre repedido ejemplo
    // arregloConArregloNombresRepetidos[0] = [{name:pasta, ....},{name:pasta, ....},{name:pasta, ....}]
    for (let i in arregloNombres) {
      arregloConArregloNombresRepetidos[
        i
      ] = this.arregloproducrosvendidos.filter((objetos) => {
        return objetos["name"] === arregloNombres[i];
      });
    }
    console.log("arregloConArregloNombresRepetidos");
    console.log(arregloConArregloNombresRepetidos);
    console.log("finishing grouping repeated names");
    console.log("*****************************************************");
    console.log(arregloConArregloNombresRepetidos);
    /* me crea un arreglo con los indices locos*/
    console.log("me crea un arreglo con los indices locos");
    let arregloIndicesCorregidosNombres = [];
    arregloConArregloNombresRepetidos.map((arregloNombres) => {
      arregloIndicesCorregidosNombres.push(arregloNombres);
    });
    console.log("indices  *****************************");
    console.log(arregloIndicesCorregidosNombres);
    let arregloFinalResumenCantidadVentas = [];
    let preciototal = 0;
    let cantidadtotal = 0;
    /*
    [
        [
        {name: "Almojabana", price: 9, … },​​
        {name: "Almojabana", price: 4.5, … },​​
        {name: "Almojabana", price: 3, … },​​
        {name: "Almojabana", price: 3, … }
        ],
        [
        {name: "Empanada", price: 5, … },​​
        {name: "Empanada", price: 5.5, … },​​
        {name: "Empanada", price: 5, … },​​
        {name: "Empanada", price: 5, … }
        ],
    ]
    */
    for (let i in arregloIndicesCorregidosNombres) {
      preciototal = 0;
      cantidadtotal = 0;
      let objeto = {};
      for (let j in arregloIndicesCorregidosNombres[i]) {
        const {
          name,
          price,
          quantity,
          category,
        } = arregloIndicesCorregidosNombres[i][j];
        preciototal += price;
        cantidadtotal += quantity;
        objeto["product_name"] = name;
        objeto["product_total"] = preciototal;
        objeto["product_quantity"] = cantidadtotal;
        objeto["product_category"] = category;
      }
      arregloFinalResumenCantidadVentas.push(objeto);
    }

    console.log("final todo sumado y medido");
    console.log(arregloFinalResumenCantidadVentas);
    const fecha = new Date();
    const stringfecha =
      fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();
    Swal.fire({
      icon: "success",
      title: "Are you completely sure you want to upload sales",
      text: "only upload sales at the end of the day",
      showCancelButton: true,
      confirmButtonText: "Upload todays sales",
      cancelButtonText: "Not Yet >",
      confirmButtonColor: "green",
      cancelButtonColor: "darkred",
    }).then((result) => {
      if (result.value) {
        //pasarle cero al acumulador por que o sino le manda el objeto el pendejo
        this.autoSuma = arregloFinalResumenCantidadVentas.reduce((ac, cv) => {
          return ac + cv.product_total;
        }, 0);
        console.log("que carajos esta pasando");
        console.log(this.autoSuma);

        /* mande el dia de hoy para no formar desorden*/
        const postObject = {
          cajero: localStorage.getItem("name"),
          totalventa: this.autoSuma,
          productos: arregloFinalResumenCantidadVentas,
          date: stringfecha,
        };
        console.log("postObject");
        console.log(postObject);
        this.ventaService.agregarVentaSummary(postObject).subscribe(
          (res) => {
            this.arregloproducrosvendidos = [];
            this.router.navigate(["/resumen"]);
          },
          (error: HttpErrorResponse) => {
            Swal.fire(error.error);
          }
        );
      }
    });

    /* mongo schemas
     const UserSchema = new mongoose.Schema({
      cajero: {
         type: String,
         required: false
      },
      totalventa: {
         type: Number,
         required: true
      },
      productos: [
          {
              product_name:{type:String},
              product_category:{type:String},
              product_quantity:{type:Number},
              product_total:{type:Number},
          }
      ],
      date: {
         type: Date,
         default: Date.now
      },
      user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Cajero',
         required:false
     },
   }); */
  }
  addextrafruit(product, extra) {
    let additional = parseInt(extra);
    if (!additional) {
      additional = 0;
    }
    product.price = this.initialpriceforsmoothies + additional;
  }
  addextrascrub(product, extrascrub, extrafruit) {
    if (!extrascrub) {
      extrascrub = 0;
    }
    if (!extrafruit) {
      extrafruit = 0;
    }
    let additional = parseInt(extrascrub) * 2 + parseInt(extrafruit);
    if (!additional) {
      additional = 0;
    }
    product.price = this.initialpriceforsmoothies + additional;
  }

  deleteAllSales() {
    this.autoSuma = 0;
    Swal.fire({
      icon: "error",
      title: "Are you sure you wanna delete ALL Ventas",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'DELETE <i class="fas fa-skull-crossbones"></i>',
      cancelButtonText: 'NO DELETE <i class="fas fa-walking"></i>',
      confirmButtonColor: "#9D0D0B",
      cancelButtonColor: "#19B600",
    }).then((result) => {
      if (result.value) {
        this.arregloproducrosvendidos = [];
        Swal.fire(
          "Irreversible todas las ventas se eliminaron de la base de datos"
        );
        this.preventasService.deleteAllSales().subscribe(
          (data) => {
            this.messageService.add({
              severity: "error",
              summary: "Todo se ha eliminado de la base de datos",
              detail: "en la base de datos id = ",
            });
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    });
  }
  /* cuando doy click al boton del menu rapido */
  assignMenuValue(val) {
    this.activateShortCutComponent = false;
    this.itemssubcatmenu = val;
    
    this.copiaSeguraProductosParaEnviar = this.products.filter(
      (el: Item) => el.category === val
    );
    /* scroll bien parriba */

    /* active el filtro de busqueda */
  }

  onCloseComponentFromChild(evento) {
    this.closeJournalComponent = true;
  }

  /* SHORTCUT COMPONENT */
  /* SHORTCUT COMPONENT */
  /* SHORTCUT COMPONENT */
  /* SHORTCUT COMPONENT */
  /* SHORTCUT COMPONENT */

  buttonTecladoPressed(evento) {
    console.log(evento.target.innerText);
    console.log(typeof evento.target.innerText);
    this.productoShortCut += evento.target.innerText;
    this.productoShortCutConSeparadorDeMiles = (
      parseInt(this.productoShortCut) / 100
    ).toFixed(2);
  }
  deleteButtonPressed(evento) {
    this.productoShortCut = "";
    this.productoShortCutConSeparadorDeMiles = "";
  }
  goButtonPressed(evento) {
    let enteroCodigoProducto = 0;

    enteroCodigoProducto = parseInt(this.productoShortCut) || 0;

    this.productoShortCut = "";
    switch (enteroCodigoProducto) {
      case 0:
        alert("no has seleccionado nada");
        break;
      case 1:
        this.products.map((each_product) => {
          if (each_product["name"] === "empanada") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 2:
        this.products.map((each_product) => {
          if (each_product["name"] === "almojabana") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 3:
        this.products.map((each_product) => {
          if (each_product["name"] === "rosca") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 4:
        this.products.map((each_product) => {
          if (each_product["name"] === "buñuelos") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 5:
        this.products.map((each_product) => {
          if (each_product["name"] === "pan grande") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 6:
        this.products.map((each_product) => {
          if (each_product["name"] === "pan pequeño") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 7:
        this.products.map((each_product) => {
          if (each_product["name"] === "croissant plane") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 8:
        this.products.map((each_product) => {
          if (each_product["name"] === "croissant queso") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;

      case 19:
        this.products.map((each_product) => {
          if (each_product["name"] === "arepa") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 25:
        this.products.map((each_product) => {
          if (each_product["name"] === "pan de yuca") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 13:
        this.products.map((each_product) => {
          if (each_product["name"] === "smoothie small 1 fruta") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 14:
        this.products.map((each_product) => {
          if (each_product["name"] === "smoothie large 1 fruta") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 15:
        this.products.map((each_product) => {
          if (each_product["name"] === "smoothie small") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 16:
        this.products.map((each_product) => {
          if (each_product["name"] === "smoothie large") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 9:
        this.products.map((each_product) => {
          if (each_product["name"] === "cafe small") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 10:
        this.products.map((each_product) => {
          if (each_product["name"] === "cafe large") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 22:
        this.products.map((each_product) => {
          if (each_product["name"] === "capuccino sm") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 23:
        this.products.map((each_product) => {
          if (each_product["name"] === "capuccino lg") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 11:
        this.products.map((each_product) => {
          if (each_product["name"] === "jugo small 4 ingredientes") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 12:
        this.products.map((each_product) => {
          if (each_product["name"] === "jugo large 4 ingredientes") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 17:
        this.products.map((each_product) => {
          if (each_product["name"] === "pitaya Bowl 3 scoops") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 18:
        this.products.map((each_product) => {
          if (each_product["name"] === "pitaya bowl 4 scoops") {
            this.product = each_product;
          }
        });
        this.displayDialog = true;
        break;
      case 30:
        this.products.map((each_product) => {
          if (each_product["name"] === "soda") {
            this.product = each_product;
          }
        });

        break;
    }

    this.priceInitial = this.product["price"];
    /* limpiiar los input*/
    this.extrafruit = null;
    this.extrascrub = null;
    /* extra fruit and scrub functions*/
    this.initialpriceforsmoothies = parseFloat(this.product["price"]);
    console.log("this.initialpriceforsmoothies = product.price;");
    console.log(this.initialpriceforsmoothies);
    this.quantity = 1;
    this.giveChange = 0;
    this.calcularSumaTotalyCantidad();
    this.sell(this.product);
  }

  addOnlyValue() {
    this.quantity = 1;
    let enteroCodigoProducto = 0;
    enteroCodigoProducto = parseFloat(this.productoShortCut) || 0;
    enteroCodigoProducto = enteroCodigoProducto / 100;
    this.productoShortCut = "";
    this.prodcutoVendido = {
      category: "bakery",
      name: "undefined",
      price: enteroCodigoProducto,
      quantity: this.quantity,
    };
    console.log(this.prodcutoVendido);
    this.productoShortCut = this.productoShortCut.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );
    this.messageService.add({
      severity: "success",
      summary: this.prodcutoVendido.x,
      detail: "Producto sin especificar Guardado",
    });
    /* Mandelo al hijo con el ide de la venta que viene backend */

    /* metalo en la tabla de productos vendidos */
    this.arregloproducrosvendidos.push(this.prodcutoVendido);
    this.sell(this.prodcutoVendido);
    this.calcularSumaTotalyCantidad();
  }

  calcularSumaTotalyCantidad() {
    this.sumarTodoLoVendido();
    this.recalcularCantidadProductos();
  }

  sumarTodoLoVendido() {
    this.autoSuma = 0;
    this.arregloproducrosvendidos.forEach((element) => {
      this.autoSuma += element.price;
    });
  }

  recalcularCantidadProductos() {
    this.totalquantity = 0;
    for (let i in this.arregloproducrosvendidos) {
      this.totalquantity += this.arregloproducrosvendidos[i].price;
    }
  }
  /* POST PREVENTAS  */
  newSoldDATA(dataBack: Item[]) {
    this.arregloproducrosvendidos.push(...dataBack);
    this.recalcularCantidadProductos();
  }
}
