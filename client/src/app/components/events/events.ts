import {Event} from "../../models/event";
import {Component, OnInit} from '@angular/core'
import {Restangular} from "ng2-restangular";

import * as _ from 'lodash'
import {Observable} from "rxjs";

class EventWrapper {
  constructor(public event: Event,
              public editing?: boolean) {
  }
}

@Component({
  selector: 'events',
  templateUrl: './events.html'
})
export class EventsComponent implements OnInit {
  public eventWrappers: EventWrapper[];

  constructor(private restangular: Restangular) {
  }

  ngOnInit() {
    this.loadEventList();
  }

  loadEventList() {
    this.restangular.all('events').getList()
      .switchMap(eventList =>
        Observable.from<Event>(eventList)
          .map(event => new EventWrapper(event, false))
          .toArray())
      .subscribe((wrappedEvents: EventWrapper[]) => {
        this.eventWrappers = wrappedEvents;
      }, (error) => {
        console.log('Error getting list of events', error)
      });
  }

  onNewEvent(event) {
    this.loadEventList();
  }

  onEventUpdated(eventWrapper) {
    eventWrapper.editing = false;

  }

  edit(eventWrapper) {
    eventWrapper.editing = true;
  }
}

