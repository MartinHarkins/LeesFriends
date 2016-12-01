import {Event} from "../../models/event";

interface IEventsController {

}

class EventsController implements IEventsController {
  public events:Event[];

  static $inject = ['Restangular'];

  constructor(public RestangularService: restangular.IService) {
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

    RestangularService.all('events').getList().then((eventList: Event[]) => {
      this.events = eventList;
    });
  }
}

export class EventsComponent implements ng.IComponentOptions {
  restrict = 'E';

  templateUrl = 'app/components/events/events.html';

  controller = EventsController;
}

