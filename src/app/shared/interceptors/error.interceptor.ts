import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { ErrorModalComponent } from 'src/app/shared/components/error-modal/error-modal.component';
import { ToastrService } from 'ngx-toastr';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // bsModalRef: BsModalRef;

  constructor(
    private toasterService: ToastrService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            if ([400, 500].indexOf(error.status) !== -1) {
              if (request.url.indexOf('/o/token/') >= 0) {
                return throwError(error);
              }
            }

            else if (error.status === 404) {
              this.toasterService.error('Not Found!', '404 - API not Found');
            }
          }

          else if (error instanceof TimeoutError) {
            this.toasterService.error('API Request Timeout!', 'Timeout');
          }

          return throwError(error);
        })
      );
  }
}
