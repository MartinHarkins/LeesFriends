import {Event} from "../../models/event";

interface IEventsController {
  save(event: Event): void;
  getEvents(): void;
}

class EventsController implements IEventsController {
  public events:Event[];
  public newEvent:Event;

  public service: restangular.IService;

  static $inject = ['Restangular'];

  constructor(public RestangularService: restangular.IService) {
    this.service = RestangularService;
    this.events = [{
      title: 'Title 1',
      content: 'Content 1',
      date: new Date()
    }, {
      title: 'Title 2',
      content: 'Content 2',
      date: new Date()
    }];
    console.log('created events');

    this.getEvents();
  }

  getEvents() {
    this.service.all('events').getList().then((eventList: Event[]) => {
      this.events = eventList;
    });
  }

  save(newEvent: Event) {
    console.log("Saving event");
    this.service.all('events').get<restangular.ICollection>().then((eventList: restangular.ICollection) => {
      eventList.post({event: newEvent}).then(() => this.getEvents());
    });
  }


}

export class EventsComponent implements ng.IComponentOptions {
  restrict = 'E';

  templateUrl = 'app/components/events/events.html';

  controller = EventsController;
}

