import {Event} from "../../models/event";
import {Component, EventEmitter, Output, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Restangular} from "ng2-restangular";

import {Observable} from "rxjs";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'event-editor',
  templateUrl: 'event-editor.html',
  styleUrls: ['./event-editor.scss']
})
export class EventEditorComponent {
  @Output() onEventAdded = new EventEmitter<Event>();
  @Output() onEventUpdated = new EventEmitter<Event>();
  @Input() event?: Event;

  editing = false;
  submitted = false;

  constructor(private service: EventsService) {
  }

  ngOnInit() {
    if (this.event) {
      this.editing = true;
    } else {
      this.event = new Event('', '', new Date());
    }

  }

  save() {
    if (!this.editing) {
      this.add(this.event);
    } else {
      this.update(this.event);
    }
  }

  private add(newEvent: Event) {
    // TODO: handle errors
    this.service.addEvent(newEvent)
      .subscribe(() => this.onEventAdded.emit(newEvent));
  }

  private update(event: Event) {
    this.service.updateEvent(event)
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
