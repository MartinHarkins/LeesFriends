import {Component, OnInit, ViewChild} from "@angular/core";
import {EventListComponent} from "../event-list/event-list";

@Component({
  selector: 'admin',
  template: `
<div class="container">
  <div class="row">
    <event-editor (onEventAdded)="onNewEvent($event)"></event-editor>
  </div>
  <event-list [editable]="true"></event-list>
</div>
`
})
export class AdminComponent implements OnInit {
  @ViewChild(EventListComponent)
  private eventList: EventListComponent;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Called when a new event has been added
   *
   * @param event the event that was added.
   */
  onNewEvent(event) {
    this.eventList.reloadList();
  }
}
