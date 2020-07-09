import {Injectable} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {Observable} from "rxjs";
import {Event} from "../models/event";

/**
 * Service used to interact with the public api
 */
@Injectable()
export class PublicService {
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
    return this.restangular.all('public/events').getList();
  }
}
