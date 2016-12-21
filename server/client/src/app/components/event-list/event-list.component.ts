import {Component, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs";
import {Event} from "../../models/event";
import {PublicService} from "../../services/public.service";

@Component({
  selector: 'event-list',
  styleUrls: ['event-list.scss'],
  template: `
  <div *ngIf="message" class="message">
    {{ message }}
  </div>
  <div class="row" *ngFor="let event of visibleEvents">
    <event-item [event]="event"></event-item>
    <hr/>
  </div>
  <div *ngIf="hasMore" class="more">
    <a (click)="loadMore()"><strong>More...</strong></a> 
  </div>`
})
export class EventListComponent implements OnInit {
  @Input() count?: number;

  private hasMore: boolean;

  private visibleEvents: Event[];
  private allEvents: Event[];

  private message: string;

  constructor(private service: PublicService) {
  }

  ngOnInit() {
    this.hasMore = false;
    this.message = 'Events ...';
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
        this.allEvents = eventList;

        return this.trim(eventList);
      })
      .subscribe((events: Event[]) => {
        this.visibleEvents = events;

        if (this.visibleEvents.length == 0) {
          this.message = "Sorry, we couldn't load the list of events";
        } else {
          this.message = '';
        }
      }, (error) => {
        console.log('Error getting list of events', error);
        if (this.visibleEvents.length == 0) {
          this.message = "Sorry, we couldn't load the list of events";
        }
      });
  }

  /**
   * Trim the number of events based on [count]
   */
  private trim(events: Event[]): Observable<Event[]> {
    let obs = Observable.from<Event>(events);
    // Only take [count] elements
    if (this.count) {
      this.hasMore = events.length > this.count;
      obs = obs.take(this.count);
    }
    return obs
      .toArray();
  }

  private loadMore(): void {
    const visibleCount = this.visibleEvents.length;

    // If all the events have already been loaded, reset hasMore flag
    if (visibleCount >= this.allEvents.length) {
      this.hasMore = false;
      return;
    }

    const eventsToLoad = this.allEvents.slice(visibleCount, visibleCount + this.count);
    this.trim(eventsToLoad)
      .switchMap((events: Event[]) => Observable.from(events))
      .subscribe((event: Event) => this.visibleEvents.push(event));
  }
}
