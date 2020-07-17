import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  // This will be new subject imported from RxJs
  // We will use the subject to push the authentication information
  // to the components which are interested
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http.post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.authStatusListener.next(true);
      });
  }
}
