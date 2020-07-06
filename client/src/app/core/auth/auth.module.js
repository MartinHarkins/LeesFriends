"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
var core_1 = require("@angular/core");
var core_2 = require("angular2-cookie/core");
var auth_guard_service_1 = require("./auth-guard.service");
var auth_service_1 = require("./auth.service");
var can_deactivate_guard_service_1 = require("../can-deactivate-guard.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            providers: [
                auth_guard_service_1.AuthGuard,
                auth_service_1.AuthService,
                can_deactivate_guard_service_1.CanDeactivateGuard,
                core_2.CookieService
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
