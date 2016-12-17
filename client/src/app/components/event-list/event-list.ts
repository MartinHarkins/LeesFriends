import {Component, OnInit, Input, ViewContainerRef} from "@angular/core";
import {Observable} from "rxjs";

import {Event} from "../../models/event";
import {EventsService} from "../../services/events.service";

import * as _ from "lodash";
import {ConfirmDeleteEventModalComponent, EventDeleteAction} from "./confirm-delete.modal";

import { overlayConfigFactory } from "angular2-modal";
import {Modal} from 'angular2-modal/plugins/bootstrap';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

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
  styles: [`
    .row:last-child hr {
        display:none;
    }    
    .more a {
        width: 100%;
        display: block;
        cursor: pointer;
        margin: -15px;
        padding: 15px;
    }
    `],
  template: `
  <div class="row" *ngFor="let eventWrapper of eventWrappers">
    
    <div *ngIf="editable && !eventWrapper.editing" class="pull-right">
        <button class="btn btn-primary" type="button" (click)="edit(eventWrapper)">Edit</button>
        <button *ngIf="eventWrapper.event.published" class="btn btn-info" type="button" (click)="unpublish(eventWrapper)">Unpublish</button>
        <button class="btn btn-danger" type="button" (click)="deleteEvent(eventWrapper)">Delete</button>
    </div>
    
    <event-item *ngIf="!eventWrapper.editing" [event]="eventWrapper.event"></event-item>

    <event-editor *ngIf="editable && eventWrapper.editing" [event]="eventWrapper.event" (onEventUpdated)="onEventUpdated(eventWrapper)" (onEditCancel)="onEditEventCancelled(eventWrapper)"></event-editor>
    <hr/>
  </div>
  <div *ngIf="hasMore" class="more">
    <a (click)="loadMore()"><strong>More...</strong></a> 
  </div>`
})
export class EventListComponent implements OnInit {
  @Input() editable?: boolean;
  @Input() count?: number;

  private hasMore: boolean;

  private eventWrappers: EventWrapper[];
  private allEvents: Event[];

  constructor(private service: EventsService, vcRef: ViewContainerRef, public modal: Modal) {
    modal.overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.hasMore = false;
    this.reloadList();
  }

  /**
   * Loads up the event list and wraps it up
   */
  public reloadList() {
    // Get dates in the order of decreasing dates.
    // Angular 2 doc recommends doing sorting away from template.
    this.service.getEventsByDateDesc(this.editable ? {includeDrafts: true} : undefined)
      .switchMap((eventList: Event[]) => {
        this.allEvents = eventList;

        return this.wrapEvents(eventList);
      })
      .subscribe((wrappedEvents: EventWrapper[]) => {
        this.eventWrappers = wrappedEvents;
      }, (error) => {
        console.log('Error getting list of events', error)
      });
  }

  private wrapEvents(events: Event[]): Observable<EventWrapper[]> {
    // break up event list and wrap each item. then build list up again
    let obs = Observable.from<Event>(events);
    // Only take [count] elements
    if (this.count) {
      this.hasMore = events.length > this.count;
      obs = obs.take(this.count);
    }
    return obs
      .map(event => new EventWrapper(event, false))
      .toArray();
  }

  private loadMore(): void {
    const visibleCount = this.eventWrappers.length;

    // If all the events have already been loaded, reset hasMore flag
    if (visibleCount >= this.allEvents.length) {
      this.hasMore = false;
      return;
    }

    const eventsToLoad = this.allEvents.slice(visibleCount, visibleCount + this.count);
    this.wrapEvents(eventsToLoad)
      .switchMap((wrappedEvents: EventWrapper[]) => Observable.from(wrappedEvents))
      .subscribe((wrappedEvent: EventWrapper) => {
        this.eventWrappers.push(wrappedEvent);
      })
  }

  /**
   * Edit an event
   *
   * @param eventWrapper
   */
  private edit(eventWrapper) {
    this.toggleEdit(eventWrapper, true);
  }

  private deleteEvent(eventWrapper) {
    this.modal.open(ConfirmDeleteEventModalComponent, overlayConfigFactory({event: eventWrapper.event}, BSModalContext))
      .then((dialogRef) => {
      console.log('test');
        if (dialogRef.result) {
          return dialogRef.result;
        }
        throw new Error('No result');
      })
      .then((action: EventDeleteAction) => {
        if (!action) {
          return;
        }
        switch(action) {
          case EventDeleteAction.DELETE:
            this.service.deleteEvent(eventWrapper.event)
              .subscribe(
                () => _.remove(this.eventWrappers, eventWrapper),
                (err) => console.debug("Could not remove event", err));

            break;
          case EventDeleteAction.UNPUBLISH:
            console.log("unpublish");
            break;
          case EventDeleteAction.CANCEL:
          default:
            break;
        }
      }, (err: any) => console.debug('Could not retrieve result.', err));
  }

  private unpublish(eventWrapper) {
    _.assignIn(eventWrapper.event, {published: false});
    this.service.updateEvent(eventWrapper.event)
      .subscribe((event: Event) => eventWrapper.event = event );
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
