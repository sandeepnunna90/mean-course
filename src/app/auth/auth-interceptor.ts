import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

// HttpInterceptor interface forces you to add intercept() method
// which gets called on methods on requests leaving the application
// works a lot like middleware in nodejs (just on outgoing messages)
// Lecture-105 - udemy course
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  // Observable<HttpEvent> typedef not in course but from google
  // https://angular.io/api/common/http/HttpInterceptor#intercept

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    // we create a clone of the request as we don't
    // want to manipulate the original request due to anuglar
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
