import {Component} from "@angular/core";

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

