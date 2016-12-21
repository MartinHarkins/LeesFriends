"use strict";
var core_1 = require("@angular/core");
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            styleUrls: ['./home.scss'],
            template: "\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-1\"></div>\n      <div class=\"col-lg-6\">\n        <our-mission></our-mission>\n      </div>\n      <div class=\"col-lg-5\">\n        <div class=\"event-list-container\">\n          <event-list [count]=\"4\"></event-list>\n        </div>\n      </div>\n    </div>\n  </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.js.map