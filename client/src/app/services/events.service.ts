import {Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";

import {Event} from '../models/event'

@Injectable()
export class EventsService {
  constructor(private restangular: Restangular) {
  }

  public getEventsByDateDesc(): Observable<Event[]> {
    // TODO: handle error
    return this.restangular.all('events').getList();
  }

  public addEvent(newEvent: Event): Observable<Event> {
    // TODO: handle error
    return this.restangular.all('events').getList()
      .switchMap(events => events.post({event: newEvent}));
  }

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
