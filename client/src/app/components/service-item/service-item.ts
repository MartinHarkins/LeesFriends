import {Service} from "../../models/service";

interface IServiceBindings {
  service: Service;
}

interface IServiceItemController extends IServiceBindings{
  getVariable():any;
}

class ServiceItemController implements IServiceItemController {
  public service:Service;

  constructor() {
    console.log('service:', this.service);
  }

  getVariable():string {
    return 'Hello!';
  }
}

/** @ngInject */
export class ServiceItemComponent implements ng.IComponentOptions {
  bindings:any;

  templateUrl = 'app/components/service-item/service-item.html';

  controller = ServiceItemController;

  constructor() {
    this.bindings = {
      service: '<'
    }
  }
}
