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
  private userId: string;

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

  getUserId(): string {
    return this.userId;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string): any {
    const authData: AuthData = { email, password };
    return this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe((result) => {
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string): void {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string, expiresIn: number, userId: string }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expiresDate);
          this.saveAuthData(token, expiresDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    // check if token is valid from expiration perspective
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 100); // expiresIn is in milliseconds
      this.authStatusListener.next(true);
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting Timer: ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // setTime saves key-value pairs
  // expiresDate in the form of String
  // e.g: Sat Jul 18 2020 18:04:33 GMT-0400 (Eastern Daylight Time)
  private saveAuthData(token: string, expiresDate: Date, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiresDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  // setTime saves key-value pairs
  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // get authdata from the browser localstorage if it exists
  private getAuthData(): { token: string, expirationDate: Date, userId: string } {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }

    // token & userId -> short hand notation
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
