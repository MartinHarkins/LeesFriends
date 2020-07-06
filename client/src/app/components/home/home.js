"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            styleUrls: ['./home.scss'],
            template: "\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-xl-1\"></div>\n      <div class=\"col-xl-6 col-md-7\">\n        <our-mission></our-mission>\n      </div>\n      <div class=\"col-xl-5 col-md-5 event-wrapper\">\n        <div class=\"event-list-container\">\n          <event-list [count]=\"4\"></event-list>\n        </div>\n      </div>\n    </div>\n  </div>\n"
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.js.map