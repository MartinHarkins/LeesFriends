interface IHeaderController {
  getVariable():any;
}

class HeaderController implements IHeaderController {
  constructor() {
  }

  getVariable():string {
    return 'Hello!';
  }
}

/** @ngInject */
export class HeaderComponent implements ng.IComponentOptions {
  templateUrl = 'app/components/header/header.html';

  controller = HeaderController;

  constructor() {

  }
}
