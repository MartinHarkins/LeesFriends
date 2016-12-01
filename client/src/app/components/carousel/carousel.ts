export class CarouselItem {
  imgSrc:string;
  text:string;
}

interface ICarouselController {

}

class CarouselController implements ICarouselController {
  public items:Array<CarouselItem>;

  constructor() {

  }
}

/** @ngInject */
export class CarouselComponent implements ng.IComponentOptions {
  bindings:any;

  templateUrl = 'app/components/carousel/carousel.html';
  controller = CarouselController;

  constructor() {
    this.bindings = {
      items: '='
    };
  }
}
