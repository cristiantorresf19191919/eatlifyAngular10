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
  public loadingMessage = '';
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
    // Show initial loading for 2 seconds to demonstrate the loading component
    this.loading = true;
    this.loadingMessage = 'Inicializando sistema Eatlify...';
    
    this.subscription = this.sourceABC.subscribe(val=>{
      this.loading = false;
      this.loadingMessage = '';
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
    // Prevent multiple submissions
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.loadingMessage = 'Conectando con el servidor...';
    
    const emailToLowerCase = this.Emailgetter.value.toLowerCase();
    this.Emailgetter.setValue(emailToLowerCase);
   
    this.LoginDaddy.value;
    
    this.cajerosService.loginCajero(this.LoginDaddy.value).subscribe((data:User)=>{
      if (data){
        this.loadingMessage = 'Autenticando credenciales...';
        
        this.cajerosService.guardeUsuario(data.usuarioenviar);
        this.cajerosService.storeUserData(data.token,data.usuarioenviar.admin,data.usuarioenviar.id);        
        
        // Small delay to show the "Iniciando sesión" message
        setTimeout(() => {
          this.loadingMessage = 'Preparando dashboard...';
          
          setTimeout(() => {
            this.loading = false;
            this.loadingMessage = '';
            
            Swal.fire({
              title:"¡Bienvenido "+data.usuarioenviar.name+"!",
              text: "Sesión iniciada exitosamente",
              icon:"success",
              confirmButtonText: "Ingresar",
              confirmButtonColor: "#027915"
            }).then((a)=>{
              if (a.value) this.router.navigate(["/admin"]);
            });
          }, 800);
        }, 500);
      }
    },(error:HttpErrorResponse)=>{
      console.log(error);
      
      this.loading = false;
      this.loadingMessage = '';
  
      if (error.error.msg) Swal.fire({
        title:'Error de conexión',
        text:error.error.msg,
        icon:'warning',
        confirmButtonColor: "#027915"
      });
      Swal.fire({
        title:'Error de autenticación',
        text:'Credenciales inválidas. Por favor, verifica tu email y contraseña.',
        icon:'warning',
        confirmButtonColor: "#027915"
      });
    });
  }
}
