import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from './Utilties';

@Component({
  selector: 'app-parent-products',
  templateUrl: './parent-products.component.html',
  styleUrls: ['./parent-products.component.scss']
})
export class ParentProductsComponent implements OnInit, AfterViewInit {
  @ViewChild("sidebar",{static:false}) sideBar:ElementRef;

  constructor(private utilities: Utilities, private router:Router) { }

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
   
        if (prevScrollpos > currentScrollPos) {
          this.sideBar.nativeElement.style.top = "10%";
          } else {    
            this.sideBar.nativeElement.style.top = "0";
         }
        prevScrollpos = currentScrollPos;
    },true);
}

  ngOnInit() {
      //ocultar icono y estado de reciviendo pedidos
		this.utilities.setCambioRuta(true);
    this.utilities.notificarCambioRuta.emit("cambia");
    
    // this.router.navigate(["/dashboard/parentProducts/modifierGroups"])
  }

}
