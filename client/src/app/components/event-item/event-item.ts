import {Event} from "../../models/event";

import {Component, Input, EventEmitter, Output} from '@angular/core'

@Component({
  selector: 'event-item',
  templateUrl: './event-item.html'
})
export class EventItemComponent {
  @Input() event: Event;

  constructor() {

  }

  ngOnInit() {
    console.log('Event:', this.event);
  }
}
