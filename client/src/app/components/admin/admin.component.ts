import {Component} from "@angular/core";

@Component({
  selector: 'admin',
  template: `
<div class="container-fluid">
    <div class="col-lg-1">
        <a [routerLink]="['events']"><h2>Events</h2></a>
    </div>
    <div class="col-lg-11">
        <router-outlet></router-outlet>
    </div>
</div>
`
})
export class AdminComponent {
  constructor() {
  }
}
