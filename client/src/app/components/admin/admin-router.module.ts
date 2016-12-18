import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [ // import Angular's modules
    RouterModule.forChild([
      {path: 'admin', component: AdminComponent}
    ])
  ],
  exports: [ // expose our Services and Providers into Angular's dependency injection
    RouterModule
  ]
})
export class AdminRoutingModule {

}
