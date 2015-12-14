module leesFriends {
  'use strict';

  interface IHeaderController {
    print(text:string):void;
    getVariable():any;
  }

  class HeaderController implements IHeaderController {
    print(text:string):void {
      console.log(text);
    }

    getVariable():string {
      return 'Hello!';
    }
  }

  interface IHeaderScope extends ng.IScope {
    variable:string
  }

  export class HeaderDirective implements ng.IDirective {
    restrict = 'E';
    templateUrl = 'app/components/header/header.html';
    replace = true;

    controller = HeaderController;

    link = (scope:IHeaderScope, element:ng.IAugmentedJQuery, attributes:ng.IAttributes, controller:IHeaderController):void => {
      controller.print("Linked!");

      scope.variable = controller.getVariable();
    };
  }
}
