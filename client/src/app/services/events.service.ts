import {Injectable, Inject, OpaqueToken} from "@angular/core";
import {Observable} from "rxjs";
import {Event} from "../models/event";
import * as _ from "lodash";
import {AuthRestangular} from "../core/auth/auth-restangular.service";

/**
 * Service used to interact with the `/events` api
 */
@Injectable()
export class EventsService {
  constructor(@Inject(AuthRestangular) public restangular) {
  }

  /**
   * Retrieve the list of events by date
   *
   * @returns {Observable<Event[]>}
   */
  public getEventsByDateDesc(opt?: {includeDrafts: boolean}): Observable<Event[]> {
    const query = {
      includeDrafts: opt ? opt.includeDrafts : false
    };

    // TODO: handle error
    // TODO: needs to send date sorting as a parameter.
    return this.restangular.all('events').getList(query);
  }

  /**
   * Add a new event
   *
   * @param newEvent the event to be added
   * @returns {Observable<Event>} the added event
   */
  public addEvent(newEvent: Event): Observable<Event> {
    // TODO: handle error
    return this.getAllRestangularizedEvents()
      .switchMap(events => events.post({event: newEvent}));
  }

  /**
   * Get's all the events including drafts.
   *
   * @returns {any}
   */
  private getAllRestangularizedEvents() {
    return this.restangular.all('events').getList({includeDrafts: true});
  }

  /**
   * Update an event
   *
   * @param updatedEvent the event to be updated
   * @returns {Observable<Event>} the updated event
   */
  public updateEvent(updatedEvent: Event): Observable<Event> {
    // TODO: handle error
    return this.getAllRestangularizedEvents()
      .switchMap(events => {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event._id == updatedEvent._id) {
            _.assignIn(event, updatedEvent);
            return event.put();
          }
        }

        return Observable.throw(new Error('Could not find matching event'));
      });
  }

  /**
   * Update an event
   *
   * @param updatedEvent the event to be updated
   * @returns {Observable<Event>} the updated event
   */
  public deleteEvent(event: Event): Observable<boolean> {
    // Restangular delete (customDelete or even event.remove()) don't return an obserbable
    // There is no way for us to know if it will have successfully been deleted.
    // At least we'll unpublish it.
    event.published = false;

    return this.updateEvent(event)
      .do(event => this.restangular.all('events').customDELETE(event._id))
      .map(event => true);
  }
}
