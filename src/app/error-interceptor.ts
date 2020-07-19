import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // https://material.angular.io/components/dialog/overview - see TS code here
  constructor(private dialog: MatDialog) { }

  // Observable<HttpEvent> typedef not in course but from google
  // https://angular.io/api/common/http/HttpInterceptor#intercept
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // handle(req) can also listen to the response
    // handle gives us back response observable stream. we can hook into that stream
    // and listen to the events. we can use a pipe method provided by rxjs to add
    // an operator to that stream
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorComponent);
        return throwError(error);
      })
    );
  }
}
