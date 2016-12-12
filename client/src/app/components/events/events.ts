import {Component, OnInit} from "@angular/core";
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

  /**
   * Loads up the event list and wraps it up
   */
  loadEventList() {
    // Get dates in the order of decreasing dates.
    // Angular 2 doc recommends doing sorting away from template.
    this.service.getEventsByDateDesc()
      .switchMap((eventList: Event[]) =>
        // break up event list and wrap each item. then build list up again
        Observable.from<Event>(eventList)
          .map(event => new EventWrapper(event, false))
          .toArray())
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
   * Called when a new event has been added
   *
   * @param event the event that was added.
   */
  onNewEvent(event) {
    this.loadEventList();
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

