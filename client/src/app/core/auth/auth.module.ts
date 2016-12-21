import {NgModule} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {EventsModule} from "../events/events.module";
import {AuthGuard} from "../../core/auth/auth-guard.service";
import {AuthService} from "../../core/auth/auth.service";
import {CanDeactivateGuard} from "../../core/can-deactivate-guard.service";

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    CanDeactivateGuard,
    CookieService
  ]
})
export class AuthModule{}
