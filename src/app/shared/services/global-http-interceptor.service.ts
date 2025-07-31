import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            switch (error.status) {
              case 401: // login
                Swal.fire(
                  'UNAUTHORIZED',
                  'Current user did not login to the application!',
                  'warning'
                )
                this.router.navigateByUrl('/auth/login');
                handled = true;
                break;
              case 403: // forbidden
                Swal.fire(
                  'FORBIDDEN',
                  'You are not authorized to perform this action!',
                  'warning'
                )
                // this.router.navigateByUrl('/unauthorize');
                handled = true;
                break;
                case 404: // forbidden
                Swal.fire(
                  'NOT FOUND',
                  'File Not Found!',
                  'warning'
                )
                // this.router.navigateByUrl('/unauthorize');
                handled = true;
                break;
              case 408: // Timeout
                Swal.fire(
                  'TIMEOUT',
                  'Request Timeout!',
                  'warning'
                )
                this.router.navigateByUrl('/auth/login');
                handled = true;
                break;
            }
          }
        }
        if(handled){
          return of(error);
        }
        // console.log('throw error back to to the subscriber');
        return throwError(error);
      })
    );
  }
}
