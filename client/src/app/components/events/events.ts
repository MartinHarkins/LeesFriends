import {Component, OnInit, ViewChild} from "@angular/core";
import {EventListComponent} from "../event-list/event-list";

@Component({
  selector: 'events',
  template: `
<div class="container">
  <event-list></event-list>
</div>
`
})
export class EventsComponent {
  constructor() {
  }
}

