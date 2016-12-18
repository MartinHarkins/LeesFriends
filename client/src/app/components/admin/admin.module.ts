import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdminRoutingModule} from "./admin-router.module";
import {AdminComponent} from "./admin.component";
import {UsersService} from "../../services/users.service";
import {EventsModule} from "../events/events.module";
import {AdminEventsComponent} from "../admin-events/admin-events";
import {AdminWelcomeComponent} from "./admin.welcome";

@NgModule({
  declarations: [
    AdminComponent,
    AdminEventsComponent,
    AdminWelcomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    EventsModule
  ],
  providers: [
    UsersService
  ]
})
export class AdminModule{}
