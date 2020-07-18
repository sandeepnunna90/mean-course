import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;

  // This will be new subject imported from RxJs
  // We will use the subject to push the authentication information
  // to the components which are interested
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
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
    this.http.post<{ token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expiresDate);
          this.saveAuthData(token, expiresDate);
          this.router.navigate(['/']);
        }
      });
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // setTime saves key-value pairs
  // expiresDate in the form of String
  // e.g: Sat Jul 18 2020 18:04:33 GMT-0400 (Eastern Daylight Time)
  private saveAuthData(token: string, expiresDate: Date): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresDate.toISOString());
  }

  // setTime saves key-value pairs
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
