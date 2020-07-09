import {NgModule} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {AuthGuard} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import {CanDeactivateGuard} from "../can-deactivate-guard.service";

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    CanDeactivateGuard,
    CookieService
  ]
})
export class AuthModule{}
