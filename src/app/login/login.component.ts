import { Component, OnInit } from '@angular/core';
import { CajerosService } from '../servicios/cajeros.service';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AsyncValidador } from "../_validadores/LoginCorreonoEsta";
import { ValidacionesPersonalizadas } from "../_validadores/ValidacionesPersonalizadas";
import { Subscription, Observable, interval, timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthGuard } from '../servicios/auth.guard';
import { VentasService } from '../servicios/ventas.service';
// import { VentasSocketService } from '../admin/ventas-socket/ventas-socket.service';

const helper = new JwtHelperService();
interface User {
  token: string;
  usuarioenviar: {
    id: number,
    name: string,
    admin: boolean
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public passwordVisible = false;
  public loading = false;
  private subscription: Subscription;
  sourceABC: Observable<number> = timer(3000);

  LoginDaddy: FormGroup;
  email:string;
  password:string;  
  constructor(
    private cajerosService: CajerosService,
    private validacionesPersonalizadas: ValidacionesPersonalizadas,
    private asyncValidator: AsyncValidador,
    private ConstructorFormu: FormBuilder,
    private router:Router,
    private guardian:AuthGuard,
    // private socketService: VentasSocketService
    ) {
   
      if (this.guardian.TokenValide()){
        this.router.navigate(["/admin"]);
      }
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      if (this.subscription) this.subscription.unsubscribe();
      // this.subscription2.unsubscribe();
    }

  ngOnInit() {
   /*  this.socketService.connectionSuccesfully.subscribe((data)=>{
      alert("concexion con socket con exito");
    }); */
    this.loading=true;
    //esperar 3 segundos para apagar el loading
    this.subscription = this.sourceABC.subscribe(val=>{
      this.loading=false;
    });

    this.LoginDaddy = this.ConstructorFormu.group({
      email: [
        "",
        this.validacionesPersonalizadas.Busque(/\w/i),
       ],
      password: [""],
    });
  }

  get Emailgetter() {
    return this.LoginDaddy.get("email");
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(){
    this.loading=true;
    const emailToLowerCase = this.Emailgetter.value.toLowerCase();
    this.Emailgetter.setValue(emailToLowerCase);
   
    this.LoginDaddy.value;
    //esperar 3 segundos para apagar el loading
    this.subscription = this.sourceABC.subscribe(val=>{
      this.loading=false;
    });
    
    this.cajerosService.loginCajero(this.LoginDaddy.value).subscribe((data:User)=>{
      if (data){
        this.cajerosService.guardeUsuario(data.usuarioenviar);
        this.cajerosService.storeUserData(data.token,data.usuarioenviar.admin,data.usuarioenviar.id);        
        Swal.fire({
          title:"Bienvenido "+data.usuarioenviar.name,
          icon:"success",
          confirmButtonText: "Ingresar"
        }).then((a)=>{
          if (a.value) this.router.navigate(["/admin"]);
        });
      }
    },(error:HttpErrorResponse)=>{
      console.log(error);
  
      if (error.error.msg) Swal.fire({title:'Error de conexion',text:error.error.msg,icon:'warning'});
      Swal.fire({title:'Error',text:'Credenciales Invalidas',icon:'warning'})
      

    });



  }

}
