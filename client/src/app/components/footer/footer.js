"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterComponent = void 0;
var core_1 = require("@angular/core");
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'footer',
            styleUrls: ['footer.scss'],
            template: "\n    <div class=\"footer\">\n      <div class=\"container-fluid padding-top-lg padding-bottom-md free-of-charge\">\n        <div class=\"row font-size-md\">\n          All Services are Free of Charge\n        </div>\n      </div>\n      <div class=\"footer container margin-top-md padding-bottom-md\">\n        <div class=\"row center-block font-size-md\">\n          <div class=\"pull-left address-phone\">\n              <div><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> 7400 Hampton Boulevard, Room 201, Norfolk, VA. 23505</div>\n              <div class=\"phone\"><i class=\"fa fa-phone\" aria-hidden=\"true\"></i> <a href=\"mailto:7574407501\">757-440-7501</a></div>\n          </div>\n          <div class=\"pull-right\">\n              <a [routerLink]=\"'./admin'\">admin</a>            \n          </div>\n        </div>\n      </div>\n    </div>\n  \n"
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.js.map