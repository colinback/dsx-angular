import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ) {}

  getToken() {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
  }

  login(credentials): Observable<any> {
    // const data = {
    //   username: credentials.username,
    //   password: credentials.password,
    //   rememberMe: credentials.rememberMe
    // };
    //
    // return this.http.post(SERVER_API_URL + 'api/authenticate', data, {observe : 'response'}).map(authenticateSuccess.bind(this));
    //
    // function authenticateSuccess(resp) {
    //     const bearerToken = resp.headers.get('Authorization');
    //     if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    //         const jwt = bearerToken.slice(7, bearerToken.length);
    //         this.storeAuthenticationToken(jwt, credentials.rememberMe);
    //         return jwt;
    //     }
    // }

    // to-do: mock jwt
    // tslint:disable-next-line:max-line-length
    const jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUyODc3MDE3MX0.CMLFTGqj-7bsnHpY4H-Ga77tM5SXV5xn6ujB-kDNRJLlqHNqxm1OfmVf61i3BmdrGpmWQE_6OaX1ZaZ7lSXWWQ';
    this.storeAuthenticationToken(jwt, credentials.rememberMe);
    return of(jwt);
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
        this.$localStorage.clear('authenticationToken');
        this.$sessionStorage.clear('authenticationToken');
        observer.complete();
    });
  }
}
