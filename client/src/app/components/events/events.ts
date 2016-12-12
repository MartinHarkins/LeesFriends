import {Event} from "../../models/event";
import {Component, OnInit} from '@angular/core'
import {Restangular} from "ng2-restangular";

import * as _ from 'lodash'
import {Observable} from "rxjs";
import {EventsService} from "../../services/events.service";

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
  private eventWrappers: EventWrapper[];

  constructor(private service: EventsService) {
  }

  ngOnInit() {
    this.loadEventList();
  }

  loadEventList() {
    this.service.getEventsByDateDesc()
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

  private onEventUpdated(eventWrapper) {
    this.toggleEdit(eventWrapper, false);
  }

  private onEditEventCancelled(eventWrapper) {
    this.toggleEdit(eventWrapper, false);
  }

  private edit(eventWrapper) {
    this.toggleEdit(eventWrapper, true);
  }

  private toggleEdit(eventWrapper, editing) {
    eventWrapper.editing = editing;
  }
}

