/**
 * Created by mharkins on 3/20/16.
 */
var leesFriends;
(function (leesFriends) {
    'use strict';
    var CarouselItem = (function () {
        function CarouselItem() {
        }
        return CarouselItem;
    })();
    var CarouselController = (function () {
        function CarouselController() {
        }
        return CarouselController;
    })();
    var CarouselComponent = (function () {
        function CarouselComponent() {
            this.bindings = {
                items: '='
            };
            this.templateUrl = 'app/components/carousel/carousel.html';
            this.controller = CarouselController;
        }
        return CarouselComponent;
    })();
    leesFriends.CarouselComponent = CarouselComponent;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=carousel.js.map