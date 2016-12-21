"use strict";
var core_1 = require("@angular/core");
var service_1 = require("../../models/service");
var ServiceItemComponent = (function () {
    function ServiceItemComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', service_1.Service)
    ], ServiceItemComponent.prototype, "service", void 0);
    ServiceItemComponent = __decorate([
        core_1.Component({
            selector: 'service-item',
            templateUrl: './service-item.html',
            styleUrls: ['../../gunny-styles.scss', './service-item.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], ServiceItemComponent);
    return ServiceItemComponent;
}());
exports.ServiceItemComponent = ServiceItemComponent;
//# sourceMappingURL=service-item.js.map