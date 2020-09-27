import { Directive, forwardRef, Injectable } from "@angular/core";
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { Observable, timer, of } from "rxjs";
import { CajerosService } from '../servicios/cajeros.service';

@Injectable({ providedIn: "root" })
export class AsyncValidador implements AsyncValidator {
  constructor(private cajerosService: CajerosService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.cajerosService.ComparaEmail(ctrl.value).pipe(
      map(isTaken => {
        return !isTaken ? { correoExiste: true } : null;
      }),
      catchError(_ => {
        return of({ serverError: true });
      })
    );
  }
}
