"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceItemComponent = void 0;
var core_1 = require("@angular/core");
var service_1 = require("../../models/service");
var ServiceItemComponent = /** @class */ (function () {
    function ServiceItemComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", service_1.Service)
    ], ServiceItemComponent.prototype, "service", void 0);
    ServiceItemComponent = __decorate([
        core_1.Component({
            selector: 'service-item',
            template: "\n<div class=\"service-item\">\n  <div class=\"image-container margin-bottom-sm\">\n    <img alt=\"{{service.title}}\" src=\"{{service.url}}\" class=\"img-thumbnail\" [fadeIn]/>\n  </div>\n  <h3>{{service.title}}</h3>\n  <p>{{service.description}}</p>\n</div>\n",
            styleUrls: ['../../gunny-styles.scss', './service-item.scss']
        })
    ], ServiceItemComponent);
    return ServiceItemComponent;
}());
exports.ServiceItemComponent = ServiceItemComponent;
//# sourceMappingURL=service-item.js.map
