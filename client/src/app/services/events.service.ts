import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {Event} from "../models/event";
import * as _ from "lodash";
import {authRestangular} from "../core/auth/auth-restangular.service";
import {map, switchMap, tap} from "rxjs/operators";
import {Restangular} from "ngx-restangular";

type Put<T> = () => Observable<T>;

interface MyType<T> {
  _id?: number;
  put: Put<T>;
  post: (e: {event: T}) => Observable<MyType<T>>;
}

type RType<T> = MyType<T> | T;

interface REvent extends Event, Restangular {}
interface REventList extends Array<Event>, Restangular {}

/**
 * Service used to interact with the `/events` api
 */
@Injectable()
export class EventsService {
  constructor(@Inject(authRestangular) public restangular) {
  }

  /**
   * Retrieve the list of events by date
   *
   * @returns {Observable<Event[]>}
   */
  public getEventsByDateDesc(opt?: { includeDrafts: boolean }): Observable<Event[]> {
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
      .pipe(
        switchMap((events: REventList) => events.post({event: newEvent})  as Observable<Event>)
      );
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
      .pipe(
        switchMap((events: Event[]) => {
          for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event._id === updatedEvent._id) {
              _.assignIn(event, updatedEvent);
              return (event as REvent).put() as Observable<Event>;
            }
          }

          throw new Error('Could not find matching event');
        }));
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
      .pipe(
        tap(unpublishedEvent => this.restangular.all('events').customDELETE(unpublishedEvent._id)),
        map(unpublishedEvent => true));
  }

  /**
   * Get's all the events including drafts.
   *
   * @returns {any}
   */
  private getAllRestangularizedEvents(): Observable<REventList> {
    return this.restangular.all('events').getList({includeDrafts: true});
  }
}
