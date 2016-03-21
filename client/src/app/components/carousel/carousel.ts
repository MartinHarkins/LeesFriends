/**
 * Created by mharkins on 3/20/16.
 */
module leesFriends {
  'use strict';

   class CarouselItem {
     imgSrc:string;
     text:string;
   }

  interface ICarouselController {

  }

  class CarouselController implements ICarouselController {
    public items: Array<CarouselItem>;

    constructor() {

    }
  }

  export class CarouselComponent implements angular.IComponentOptions {
    bindings = {
      items: '='
    };

    templateUrl = 'app/components/carousel/carousel.html';
    controller = CarouselController;

    constructor() {

    }
  }
}
