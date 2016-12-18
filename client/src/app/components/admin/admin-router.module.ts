import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";
import {AdminEventsComponent} from "../admin-events/admin-events";
import {AdminWelcomeComponent} from "./admin.welcome";

@NgModule({
  imports: [ // import Angular's modules
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            component: AdminWelcomeComponent
          },
          {
            path: 'events',
            component: AdminEventsComponent
          }
        ]
      }
    ])
  ],
  exports: [ // expose our Services and Providers into Angular's dependency injection
    RouterModule
  ]
})
export class AdminRoutingModule {

}
