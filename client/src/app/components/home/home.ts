import {Component} from "@angular/core";

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  template: `
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-6">
        <our-mission></our-mission>
      </div>
      <div class="col-lg-5">
        <div class="event-list-container">
          <event-list [count]="4"></event-list>
        </div>
      </div>
    </div>
  </div>
`
})
export class HomeComponent {
  constructor() {
  }
}
