import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { CajerosService } from "src/app/servicios/cajeros.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { ColorNavLinkService } from "../main-nav/color-nav-link.service";
import { Utilities } from '../parent-products/Utilties';

interface DataServer {
  name: string;
  email: string;
  admin: boolean;
  superuser: boolean;
  id: number;
}

@Component({
  selector: "app-cajeros",
  templateUrl: "./cajeros.component.html",
  styleUrls: ["./cajeros.component.scss"],
})
export class CajerosComponent implements OnInit {
  admin: string;
  email = new FormControl("", [Validators.required, Validators.email]);
  name = new FormControl("");
  password = new FormControl("");
  isadmin = new FormControl(false);
  hide: boolean = true;
  panelOpenState = false;
  editionmode = false;
  cajerosRegistrados = [];
  currentIndex: number;
  constructor(
    private cajerosService: CajerosService,
    private cambioRuta: ColorNavLinkService,
    private utilites: Utilities
  ) {}
  ngOnInit() {

    this.utilites.setCambioRuta(true);
    // todo esto solo es para quitarle el color fastidioso del link
    // del dashboard
    this.cambioRuta.setSujeto(true);

    this.admin = localStorage.getItem("admin");
    this.cajerosService.verCajeros().subscribe(
      (cajeros: any) => {
        this.cajerosRegistrados = cajeros;
        console.log(cajeros);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Utilities.errorDeConexion();
      }
    );
  }
  userNotAdmin() {
    if (localStorage.getItem("user") === "false") {
      Swal.fire({
        title:
          "You have no permissions to make this actions sorry.. for more info contact Cristian please",
        icon: "error",
      });
      return true;
    }
  }
  registrar() {
    const user = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      admin: this.isadmin.value,
      superuser: false,
    };
    if (this.userNotAdmin()) return;
    this.cajerosService.AgregarCajero(user).subscribe(
      (data: DataServer) => {
        console.log(data);
        this.cajerosRegistrados.push(data);
        Swal.fire({
          icon: "success",
          title: "Cashier Created!",
          text: `Cashier ${data.name} has been successfully created.`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error)
          Swal.fire({
            title: error.error.msg + " " + error.status,
            icon: "warning",
          });
      }
    );
  }

  delete(user) {
    console.log(user);
    if (this.userNotAdmin()) return;
    this.cajerosRegistrados = this.cajerosRegistrados.filter((h) => h !== user);
    this.cajerosService.deleteCajero(user._id).subscribe(
      (data) => {
        if (data)
          Swal.fire(
            "el cajero " + user.name + " ha sido eliminado de la base de datos"
          );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire("error en el servidor");
      }
    );
  }
  update(user) {
    console.log("usuario que voy a actualizar es");
    console.log("usuario que voy a actualizar es");
    console.log(user);
    console.log("usuario que voy a actualizar es");
    console.log("usuario que voy a actualizar es");
    if (this.userNotAdmin()) return;
    this.cajerosService.updateUser(user).subscribe(
      (data) => {
        if (data)
          Swal.fire(
            "el cajero se ha actualizado con exito en la base de datos"
          );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getErrorMessage() {
    return this.email.hasError("required")
      ? "Email requerido"
      : this.email.hasError("email")
      ? "Email no valido"
      : "";
  }
}
