import {Event} from "../../models/event";
import {Component, Input} from "@angular/core";

import * as moment from 'moment';

@Component({
  selector: 'event-item',
  templateUrl: './event-item.html'
})
export class EventItemComponent {
  @Input() event: Event;

  formattedDate: string;

  constructor() {
  }

  ngOnInit() {
    console.log('Event:', this.event);

    // TODO: export date format.
    this.formattedDate = moment(this.event.date).format('MM/DD/YYYY');
  }
}
