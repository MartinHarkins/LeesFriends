/**
 * Created by mharkins on 3/20/16.
 */

module leesFriends {
  interface IListBindings {
    list:Array<Thing>;
  }

  interface IATController extends IListBindings{
    print(text:string):void;
    getVariable():any;
  }

  class ATController implements IATController {
    public list: Array<Thing>;

    constructor() {
      // Can do things with the list here
    }

    print(text:string):void {
      console.log(text);
    }

    getVariable():string {
      return 'Hello!';
    }
  }

  export class ATComponent implements ng.IComponentOptions {
    bindings = {
      list: '<'
    };

    templateUrl = 'app/components/awesome-things/awesome-things.html';

    controller = ATController;

    constructor() {

    }
  }

}
