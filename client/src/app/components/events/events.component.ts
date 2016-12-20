import {Component, OnInit, ViewChild} from "@angular/core";
import {EventListEditableComponent} from "../event-list/event-list-editable";

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

