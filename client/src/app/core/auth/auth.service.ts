import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {CookieService} from "angular2-cookie/core";
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
  static TOKEN = new AuthCookieKeys("JWT_TOKEN");
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
    // this.cookieService.removeAll();
    const authUserInfo = this.cookieService.get(AuthCookieKeys.TOKEN.toString());
    if (authUserInfo) {
      this.isLoggedIn = true;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.restangular.all('authenticate').customPOST({ username: username, password: password})
      .map(response => {
        this.cookieService.put(AuthCookieKeys.TOKEN.toString(), response.token);
        this.isLoggedIn = true;
        return Observable.of(true);
      })
      .catch(err => {
        console.error('Error logging in', err);
        return Observable.of(false);
      });
  }

  logout(): void {
    this.cookieService.remove(AuthCookieKeys.TOKEN.toString());
    this.isLoggedIn = false;
  }

  public getToken(): string {
    return this.cookieService.get(AuthCookieKeys.TOKEN.toString());
  }
}
