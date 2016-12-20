import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdminRoutingModule} from "./admin-router.module";
import {AdminComponent} from "./admin.component";
import {UsersService} from "../../services/users.service";
import {EventsModule} from "../events/events.module";
import {AdminEventsComponent} from "../admin-events/admin-events";
import {AdminWelcomeComponent} from "./admin.welcome";
import {AuthService} from "../../core/auth/auth.service";
import {AuthModule} from "../../core/auth/auth.module";
import {Restangular} from "ng2-restangular";
import {AUTH_RESTANGULAR} from "../../services/events.service";

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
      provide: AUTH_RESTANGULAR,
      useFactory: (restangular: Restangular, authService: AuthService) => {
        return restangular.withConfig((RestangularConfigurer) => {
          console.log('setting up AuthRestangular');
          RestangularConfigurer.setDefaultHeaders({
            'x-access-token': authService.getToken()
          });
          console.log('did set up AuthRestangular');

        });
      },
      // multi: true,
      deps: [Restangular, AuthService]
    }
  ]
})
export class AdminModule {
}
