import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CajerosService } from 'src/app/servicios/cajeros.service';
import { ColorNavLinkService } from './color-nav-link.service';
import { ChipStatus } from './chipStatus';
import { Utilities } from '../parent-products/Utilties';
import { Store, select } from '@ngrx/store';
import { Restaurant } from '../../models/Restaurant';


import { State } from 'src/app/store';
import { getRestaurantName } from 'src/app/store/reducers/restaurantReducer';


@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: [ './main-nav.component.scss' ]
})
export class MainNavComponent implements OnInit, OnChanges, OnDestroy {
	nombre: string;
	restaurantName$: Observable<string> = this.store.pipe(select(getRestaurantName));

	public isInDashboardUrl: boolean = false;	
	chip:ChipStatus = new ChipStatus();

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((result) => result.matches), shareReplay());

	constructor(
		private breakpointObserver: BreakpointObserver,
		public router: Router,
		private cajerosService: CajerosService,
		private cambioRuta : ColorNavLinkService,
		private utilities: Utilities,
		private store: Store<State>
	) {}

	logout() {
		localStorage.clear();
		this.cajerosService.logout();
		this.router.navigate([ '/' ]);
	}

	ngOnInit() {
	


		this.utilities.getCambioRuta().subscribe((booleano:boolean) => {
			if (booleano){
				this.isInDashboardUrl = false;
			}
		})
	
		this.nombre = localStorage.getItem('name');
		this.chip.estadoStatus = "Online";
		this.chip.estado = "Tu restaurante esta Recibiendo Pedidos";
		if (this.router.url === "/dashboard"){
			this.isInDashboardUrl = true;
		} else {
			this.isInDashboardUrl = false;
		}
		//todo esto es para quitar el color fastidioso del dashboard
		// nose como mas se haria
		this.cambioRuta.getSujeto().subscribe(booleano => {
			if (booleano){
				this.isInDashboardUrl = false; 
			
			} else {
				this.isInDashboardUrl = true;
			}
		})
		
	}

	ngOnChanges(e: SimpleChanges){
	

		this.cambioRuta.getSujeto().subscribe(booleano => {
			if (booleano){
				this.isInDashboardUrl = false; 
				
			} else {
				this.isInDashboardUrl = true;
			}
		})
		if (this.router.url === "/dashboard"){
			this.isInDashboardUrl = true;
		} else {
			this.isInDashboardUrl = false;
		}
		
		
	}

	ngOnDestroy(){
		this.utilities.setCambioRuta(true);
	}	
	
	offline(){
		this.chip.estado = "Tu restaurante esta OFFLINE"
		this.chip.estadoStatus = "offline"
		this.chip.color = "warn"
	}

	online(){
		this.chip.estado = "Tu restaurante esta ONLINE";
		this.chip.estadoStatus = "online";
		this.chip.color="accent";
	}

	onClickChip(){
		this.isInDashboardUrl = true;
		this.router.navigate(['/dashboard']);
	}
}
