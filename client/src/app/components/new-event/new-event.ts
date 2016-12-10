import {Event} from "../../models/event";
import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {Restangular} from "ng2-restangular";

import * as _ from 'lodash';
import {Observable} from "rxjs";

@Component({
  selector: 'new-event',
  templateUrl: './new-event.html'
})
export class NewEventComponent {
  @Output() onEventAdded = new EventEmitter<Event>();
  @Output() onEventUpdated = new EventEmitter<Event>();
  @Input() event?: Event;
  // public tinymceOptions: any;

  editing = false;
  submitted = false;

  private MyRestangular: Restangular;

  constructor(private restangular: Restangular) {
    this.MyRestangular = restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });

  }

  ngOnInit() {
    if (this.event) {
      this.editing = true;
    } else {
      this.event = new Event('','', new Date());
    }

  }

  save() {
    this.submitted = true;

    const newEvent = this.event;
    const events = this.restangular.all('events').getList();

    if (this.editing) {
      this.update(this.event);
    } else {
      this.add(newEvent);
    }
  }

  add(newEvent: Event) {
    this.restangular.all('events').getList()
      .switchMap(events => events.post({event: newEvent}))
      .subscribe(() => this.onEventAdded.emit(newEvent));

  }

  update(event: Event) {
    this.restangular.all('events').getList()
      .switchMap(events => {
        for (let i = 0; i < events.length; i ++) {
          if (events[i]._id == event._id) {
            events[i].content = event.content;
            return events[i].put();
          }
        }
        // let updatedEvent = _.find(events, (e) => e._id === event._id);
        // updatedEvent = _.assign(updatedEvent, event);
        return Observable.throw(new Error('Could not find matching event'));
      })
      .subscribe(updatedEvent => this.onEventUpdated.emit(updatedEvent),
        err => console.error('Error updating event', err));

  }

  get diagnostic(): string {
    return JSON.stringify(this.event);
  }

  doNothing() {
    // console.log("content", content);
    // this.event.content = content;
    console.log("event", this.event);
  }
}
