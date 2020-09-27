import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { Observable } from "rxjs";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class PrimerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token") || "nohaytoken";

    if (token) {
      const adminTokenReq = req.clone({
        setHeaders: { Authorization: token }
      });
      return next.handle(adminTokenReq);
    } else {
      return next.handle(req);
    }
  }
}
