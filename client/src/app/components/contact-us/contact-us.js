"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsComponent = void 0;
var core_1 = require("@angular/core");
var LatLng = /** @class */ (function () {
    function LatLng(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return LatLng;
}());
var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent() {
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        this.coords = new LatLng(36.912586, -76.305237);
    };
    ContactUsComponent = __decorate([
        core_1.Component({
            selector: 'contact-us',
            templateUrl: 'contact-us.html',
            styles: ["\n   .sebm-google-map-container {\n     height: 300px;\n     color: black;\n   }\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], ContactUsComponent);
    return ContactUsComponent;
}());
exports.ContactUsComponent = ContactUsComponent;
//# sourceMappingURL=contact-us.js.map