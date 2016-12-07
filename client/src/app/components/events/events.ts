import {Event} from "../../models/event";
import {Component} from '@angular/core'
import {Restangular} from "ng2-restangular";

import _ from 'lodash'

@Component({
  selector: 'events',
  templateUrl: './events.html'
})
export class EventsComponent {
  public events: Event[];

  constructor(private restangular: Restangular) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.restangular.all('events').getList().subscribe((eventList: Event[]) => {
      this.events = eventList;
    }, (error) => { console.log('Error getting list of events', error)});
  }


  onNewEvent() {
    console.log('created events');

    this.getEvents();
  }
}

