import {Event} from "../../models/event";
import {Component, EventEmitter, Output} from '@angular/core';
import {Restangular} from "ng2-restangular";

@Component({
  selector: 'new-event',
  templateUrl: './new-event.html'
})
export class NewEventComponent {
  @Output() onEventAdded = new EventEmitter<Event>();

  // public tinymceOptions: any;

  event = new Event("", "", null);

  submitted = false;

  constructor(private restangular: Restangular) {

    // this.tinymceOptions = {
    //   plugins: 'link image code',
    //   toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    // };
  }

  save() {
    this.submitted = true;

    const newEvent = this.event;
    this.restangular.all('events').getList()
      .switchMap(events => events.post({event: newEvent}))
      .subscribe(() => this.onEventAdded.emit(newEvent));
  }

  get diagnostic(): string {
    return JSON.stringify(this.event);
  }
}
