import {Event} from "../../models/event";

interface IEventsController {
  getEvents(): void;
  onNewEvent(event: Event): void;
}

class EventsController implements IEventsController {
  public events:Event[];

  public service: restangular.IService;

  static $inject = ['Restangular'];

  constructor(public RestangularService: restangular.IService) {
    this.service = RestangularService;
    console.log('created events');

    this.getEvents();
  }

  getEvents() {
    this.service.all('events').getList().then((eventList: Event[]) => {
      this.events = eventList;
    });
  }


  onNewEvent(event: Event) {
    this.getEvents();
  }
}

export class EventsComponent implements ng.IComponentOptions {
  restrict = 'E';

  templateUrl = 'app/components/events/events.html';

  controller = EventsController;
}

