import {Event} from "../../models/event";

import {Component, Input} from '@angular/core'

@Component({
  selector: 'event-item',
  templateUrl: './event-item.html'
})
export class EventItemComponent {
  @Input() event: Event;

  constructor() {
    console.log('Event:', this.event);
  }
}
