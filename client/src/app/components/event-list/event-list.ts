import {Component, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs";

import {Event} from "../../models/event";
import {EventsService} from "../../services/events.service";
/**
 * A wrapper for the {@link Event} components.
 */
class EventWrapper {
  constructor(public event: Event,
              public editing?: boolean) {
  }
}
@Component({
  selector: 'event-list',
  template: `
  <div class="row" *ngFor="let eventWrapper of eventWrappers">
    <event-item *ngIf="!eventWrapper.editing" [event]="eventWrapper.event"></event-item>
    <button *ngIf="editable && !eventWrapper.editing" class="btn btn-default" type="button" (click)="edit(eventWrapper)">Edit</button>

    <event-editor *ngIf="editable && eventWrapper.editing" [event]="eventWrapper.event" (onEventUpdated)="onEventUpdated(eventWrapper)" (onEditCancel)="onEditEventCancelled(eventWrapper)"></event-editor>
  </div>
`
})
export class EventListComponent implements OnInit {
  @Input() editable?: boolean;
  @Input() count?: number;

  private eventWrappers: EventWrapper[];

  constructor(private service: EventsService) {
  }

  ngOnInit() {
    this.reloadList();
  }

  /**
   * Loads up the event list and wraps it up
   */
  public reloadList() {
    // Get dates in the order of decreasing dates.
    // Angular 2 doc recommends doing sorting away from template.
    this.service.getEventsByDateDesc()
      .switchMap((eventList: Event[]) => {
        // break up event list and wrap each item. then build list up again
        let obs = Observable.from<Event>(eventList)
        // Only take [count] elements
        if (this.count) {
          obs = obs.take(this.count);
        }
        return obs
          .map(event => new EventWrapper(event, false))
          .toArray()
      })
      .subscribe((wrappedEvents: EventWrapper[]) => {
        this.eventWrappers = wrappedEvents;
      }, (error) => {
        console.log('Error getting list of events', error)
      });
  }

  /**
   * Edit an event
   *
   * @param eventWrapper
   */
  private edit(eventWrapper) {
    this.toggleEdit(eventWrapper, true);
  }

  /**
   * Called when an event was updated
   * @param eventWrapper
   */
  private onEventUpdated(eventWrapper) {
    this.toggleEdit(eventWrapper, false);
  }

  /**
   * Called when an edit was cancelled
   * @param eventWrapper
   */
  private onEditEventCancelled(eventWrapper) {
    this.toggleEdit(eventWrapper, false);
  }

  private toggleEdit(eventWrapper, editing) {
    eventWrapper.editing = editing;
  }
}
