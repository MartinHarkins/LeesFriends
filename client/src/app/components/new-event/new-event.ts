import {Event} from "../../models/event";

interface INewEventBindings {
  event:Event;

  save(event:Event):void;
}

interface INewEventController extends INewEventBindings {

}

class NewEventController implements INewEventController {
  public tinymceOptions:any;

  public onEventAdded:Function;

  public service:restangular.IService;

  event:Event;

  static $inject = ['Restangular'];

  constructor(public RestangularService:restangular.IService) {
    this.service = RestangularService;

    this.event = null;

    this.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };
  }

  save(newEvent:Event) {

    this.service.all('events').getList<restangular.ICollection>().then((eventList:restangular.ICollection) => {
      eventList.post({event: newEvent}).then(() => this.onEventAdded({$newEvent: newEvent}));
    });
  }
}

/** @ngInject */
export class NewEventComponent implements ng.IComponentOptions {
  bindings:any;

  templateUrl = 'app/components/new-event/new-event.html';

  controller = NewEventController;

  constructor() {
    this.bindings = {
      onEventAdded: '&'
    }
  }
}
