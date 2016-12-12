import {Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";

import {Event} from '../models/event'

/**
 * Service used to interact with the `/events` api
 */
@Injectable()
export class EventsService {
  constructor(private restangular: Restangular) {
  }

  /**
   * Retrieve the list of events by date
   *
   * @returns {Observable<Event[]>}
   */
  public getEventsByDateDesc(): Observable<Event[]> {
    // TODO: handle error
    // TODO: needs to send date sorting as a parameter.
    return this.restangular.all('events').getList();
  }

  /**
   * Add a new event
   *
   * @param newEvent the event to be added
   * @returns {Observable<Event>} the added event
   */
  public addEvent(newEvent: Event): Observable<Event> {
    // TODO: handle error
    return this.restangular.all('events').getList()
      .switchMap(events => events.post({event: newEvent}));
  }

  /**
   * Update an event
   *
   * @param updatedEvent the event to be updated
   * @returns {Observable<Event>} the updated event
   */
  public updateEvent(updatedEvent: Event): Observable<Event> {
    // TODO: handle error
    return this.restangular.all('events').getList()
      .switchMap(events => {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if (event._id == updatedEvent._id) {
            event.content = updatedEvent.content;
            return event.put();
          }
        }

        return Observable.throw(new Error('Could not find matching event'));
      });
  }
}
