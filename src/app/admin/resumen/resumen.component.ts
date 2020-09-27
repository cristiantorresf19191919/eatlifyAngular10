import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VentasService } from "src/app/servicios/ventas.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { Utilities } from '../parent-products/Utilties';

interface producto {
  _id: String;
  product_category: String;
  product_name: String;
  product_quantity: number;
  product_total: number;
}

interface ServerResponse {
  _id: string;
  cajero: string;
  date: string;
  productos: producto[];
  totalventa: number;
}

@Component({
  selector: "app-resumen",
  templateUrl: "./resumen.component.html",
  styleUrls: ["./resumen.component.scss"],
})

export class ResumenComponent implements OnInit, AfterViewInit {
  @ViewChild("sidebar",{static:false}) sideBar:ElementRef;
  summarysales: ServerResponse[];
  colsVentas: any;
  categorias: any;
  cols: any;
  totalquantity: number;
  data: any;
  productsMostSold: producto[];
  constructor(
    private vestaService: VentasService,
    private messageService: MessageService,
    private utilities : Utilities
  ) {}
  ngAfterViewInit(): void {
    // outputs `I am span`
   // pone la side bar bien ajustada cuando se hace scroll down
    // side-bar
    // inspeccione y busque el padre que hace el scroll y detecta los cambios    
    

    let main  =  document.querySelector(".mat-drawer-content");
    var prevScrollpos = main.scrollTop;
    console.log('prevScrollpos = ',prevScrollpos);
    main.addEventListener('scroll',()=>{
      var currentScrollPos = main.scrollTop;      
      console.log('currentScrollPos = ',currentScrollPos);
        if (prevScrollpos > currentScrollPos) {
          this.sideBar.nativeElement.style.top = "12%";
          } else {    
            this.sideBar.nativeElement.style.top = "0";
         }
        prevScrollpos = currentScrollPos;
    },true);
}

  setChartData() {
    let arregloFechasLabels = this.summarysales.map((el) => el.date);
    let datasetDataTotalVentasDia = this.summarysales.map(
      (el) => el.totalventa
    );
    let productoMasVendido = "";
    let arreglo: producto[] = [];
    let ArregloobjetoOrdenadoDeMayoraMenor;
    for (let index in this.summarysales) {
      ArregloobjetoOrdenadoDeMayoraMenor = this.summarysales[
        index
      ].productos.sort(
        (a: producto, b: producto) => b.product_quantity - a.product_quantity
      );
      ArregloobjetoOrdenadoDeMayoraMenor =
        ArregloobjetoOrdenadoDeMayoraMenor[0];
      arreglo.push(ArregloobjetoOrdenadoDeMayoraMenor);
    }
    this.productsMostSold = arreglo;

    let dataset = {
      label: "ventas",
      backgroundColor: "#42A5F5",
      borderColor: "#1E88E5",
      data: datasetDataTotalVentasDia,
    };

    let datasetMostSoldProduct = {
      label: "producto mas vendido",
      backgroundColor: "#9CCC65",
      borderColor: "#7CB342",
      data: arreglo.map((el: producto) => el.product_quantity),
    };

    this.data = {
      labels: arregloFechasLabels,
      datasets: [dataset, datasetMostSoldProduct],
    };
  }
  onscroll(evento){
    debugger;
  }
  ngOnInit() {

    
   

    //ocultar icono y estado de reciviendo pedidos
		this.utilities.setCambioRuta(true);
    /* Pido servicio get para el servidor */
	
    this.vestaService.obtenerVentasSummary().subscribe(
      (response: ServerResponse[]) => {
	
        console.log("summary response");
        /* Swal.fire('exito'); */
      
        this.summarysales = response;
        this.setChartData();
        console.log("this.summarysales  //  this.summarysales  //  ");
        console.log(this.summarysales);
        console.log("this.summarysales  //  this.summarysales  //  ");
      },
      (error: HttpErrorResponse) => {
		  	
        Swal.fire(error.message);
      }
    );

    /* busqueda global de Venta de productos*/
    this.colsVentas = [
      { field: "product_name", header: "product_name" },
      { field: "product_quantity", header: "product_quantity" },
      { field: "product_total", header: "product_total" },
    ];

    /* titulos de la tabla y arreglar el problema de col.filter para produccion */
    // Product,Quantity,Total,Category
    this.cols = [
      { field: "product_name", header: "Product" },
      { field: "product_category", header: "Category" },
      { field: "product_quantity", header: "Quantity" },
      { field: "product_total", header: "Total" },
    ];

    /* ordenar por categorias y mostrar select en la columna categorias */
    this.categorias = [
      { label: "All cat", value: null },
      { label: "natural juice", value: "natural juice" },
      { label: "smoothies", value: "smoothies" },
      { label: "bakery", value: "bakery" },
      { label: "acai/patayabowl", value: "acai/patayabowl" },
      { label: "coffee", value: "coffee" },
      { label: "cholados", value: "cholados" },
    ];
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

  paseDataString() {
    let arrexcel = [];
    let nuevoarreglo = [];
    let objetoexcel = {};
    console.log("summarySales");
    console.log("summarySales");
    console.log(this.summarysales);
    console.log("summarySales");
    console.log("summarySales");
    console.log("this.summarySales[0].productos");
    console.log(this.summarysales[0].productos);
    for (let i in this.summarysales) {
      objetoexcel = {};
      /* jeje productos es una propiedad y tiene un arreglo*/
      for (let j in this.summarysales[i].productos) {
        /* Esto se repite no hay de otra forma*/
        objetoexcel["Fecha"] = this.summarysales[i].date + "***";
        objetoexcel["Id"] = this.summarysales[i]._id + "***";
        objetoexcel["Cajero"] = this.summarysales[i].cajero + "***";
        objetoexcel["VentasTotales"] = this.summarysales[i].totalventa + "***";
        /* jeje productos es una propiedad y tiene un arreglo*/
        objetoexcel["categoria"] = this.summarysales[i].productos[
          j
        ].product_category;
        objetoexcel["producto"] = this.summarysales[i].productos[
          j
        ].product_name;
        objetoexcel["cantidad"] = this.summarysales[i].productos[
          j
        ].product_quantity;
        objetoexcel["total"] = this.summarysales[i].productos[j].product_total;
        /*Guarda un arreglo de objetos para que la libreria lo pase a excel */
        nuevoarreglo.push(objetoexcel);
        objetoexcel = {};
      }
    }
    // probando como se organiza la data
    console.log("arrexcel");
    console.log("arreglo que voy a exportar a excel");
    console.log("arreglo que voy a exportar a excel");
    console.log(nuevoarreglo);
    console.log(
      "***********************************************************************************"
    );
    return nuevoarreglo;
  }

  deleteAllSales() {
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
        this.summarysales = [];
        this.vestaService.deleteAllSales().subscribe(
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
}
