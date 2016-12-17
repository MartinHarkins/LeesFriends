import {Component} from "@angular/core";

@Component({
  selector: 'home',
  template: `
  <div class="row">
    <div class="col-lg-7">
      <our-mission></our-mission>
    </div>
    <div class="col-lg-5">
      <event-list [count]="5"></event-list>
    </div>
  </div>
`
})
export class HomeComponent{
  constructor() {}
}
