import {Event} from "../../models/event";

interface IEventBindings {
  event: Event;
}

interface IEventItemController extends IEventBindings{
  getVariable():any;
}

class EventItemController implements IEventItemController {
  public event:Event;

  constructor() {
    console.log('Event:', this.event);
  }

  getVariable():string {
    return 'Hello!';
  }
}

/** @ngInject */
export class EventItemComponent implements ng.IComponentOptions {
  bindings:any;

  templateUrl = 'app/components/event-item/event-item.html';

  controller = EventItemController;

  constructor() {
    this.bindings = {
      event: '<'
    }
  }
}
