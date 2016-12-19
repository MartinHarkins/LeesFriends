import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import {CookieService} from 'angular2-cookie/core';
import {Restangular} from "ng2-restangular";

export class Enum<T> {
  public constructor(public readonly value: T) {}
  public toString() {
    return this.value.toString();
  }
}
class AuthCookieKeys extends Enum<string>
{
  // values
  static USER = new AuthCookieKeys("USER");
}

class AuthUserInfo {
  constructor(public username: string, public bearer: string) {

  }
}

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private cookieService: CookieService, private restangular: Restangular) {
    this.cookieService.removeAll();
    const authUserInfo = this.cookieService.getObject(AuthCookieKeys.USER.toString());
    if (authUserInfo) {
      this.isLoggedIn = true;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.restangular.all('auth').customPOST({ username: username, password: password}, 'login')
      .map(user => {
        this.cookieService.putObject(AuthCookieKeys.USER.toString(), new AuthUserInfo('aUserbane', 'aBearer'));
        this.isLoggedIn = true;
        return Observable.of(true);
      })
      .catch(err => {
        console.error('Error logging in', err);
        return Observable.of(false);
      });
  }

  logout(): void {
    this.cookieService.remove(AuthCookieKeys.USER.toString());
    this.isLoggedIn = false;
  }
}
