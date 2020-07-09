"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanDeactivateGuard = void 0;
var core_1 = require("@angular/core");
var CanDeactivateGuard = /** @class */ (function () {
    function CanDeactivateGuard() {
    }
    CanDeactivateGuard.prototype.canDeactivate = function (component) {
        return component.canDeactivate ? component.canDeactivate() : true;
    };
    CanDeactivateGuard = __decorate([
        core_1.Injectable()
    ], CanDeactivateGuard);
    return CanDeactivateGuard;
}());
exports.CanDeactivateGuard = CanDeactivateGuard;
//# sourceMappingURL=can-deactivate-guard.service.js.map