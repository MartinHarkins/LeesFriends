import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdminRoutingModule} from "./admin-router.module";
import {AdminComponent} from "./admin.component";
import {UsersService} from "../services/users.service";
import {EventsModule} from "../components/events/events.module";
import {AdminEventsComponent} from "./events/events.component";
import {AdminWelcomeComponent} from "./admin.welcome";
import {Restangular} from "ngx-restangular";
import {AuthModule} from "../core/auth/auth.module";
import {AuthService} from "../core/auth/auth.service";
import {AuthRestangularFactory, authRestangular} from "../core/auth/auth-restangular.service";

@NgModule({
  declarations: [
    AdminComponent,
    AdminEventsComponent,
    AdminWelcomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthModule,
    EventsModule,
    AdminRoutingModule
  ],
  providers: [
    UsersService,
    {
      provide: authRestangular,
      useFactory: AuthRestangularFactory,
      deps: [Restangular, AuthService]
    }
  ]
})
export class AdminModule {
}
