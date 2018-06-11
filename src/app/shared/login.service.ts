import { Injectable } from '@angular/core';

import { Principal } from './auth/principal.service';
import { AuthServerProvider } from './auth/auth-jwt.service';

@Injectable()
export class LoginService {

  constructor(
    private principal: Principal,
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials, callback?) {
    const cb = callback || function() {};

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((jwt) => {
        this.principal.identity(true).then((account) => {
          resolve(jwt);
        });
        return cb();
      }, (err) => {
        this.logout();
        reject(err);
        return cb(err);
      });
    });
  }

  loginWithToken(jwt, rememberMe) {
    return this.authServerProvider.loginWithToken(jwt, rememberMe);
  }

  logout() {
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(null);
  }
}
