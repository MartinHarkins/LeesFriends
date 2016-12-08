import {Event} from "../../models/event";
import {Component, OnInit} from '@angular/core'
import {Restangular} from "ng2-restangular";

import * as _ from 'lodash'

@Component({
  selector: 'events',
  templateUrl: './events.html'
})
export class EventsComponent implements OnInit {
  public events: Event[];

  constructor(private restangular: Restangular) {
  }

  ngOnInit() {
    this.loadEventList();
  }

  loadEventList() {
    this.restangular.all('events').getList().subscribe((eventList: Event[]) => {
      this.events = _.reverse(eventList);
    }, (error) => { console.log('Error getting list of events', error)});
  }

  onNewEvent(event) {
    this.loadEventList();
  }
}

