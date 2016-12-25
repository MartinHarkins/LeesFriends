import {Component} from "@angular/core";

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  template: `
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-1"></div>
      <div class="col-xl-6 col-md-7">
        <our-mission></our-mission>
      </div>
      <div class="col-xl-5 col-md-5 event-wrapper">
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
