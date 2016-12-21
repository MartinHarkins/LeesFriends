"use strict";
var core_1 = require("@angular/core");
var core_2 = require("angular2-cookie/core");
var auth_guard_service_1 = require("../../core/auth/auth-guard.service");
var auth_service_1 = require("../../core/auth/auth.service");
var can_deactivate_guard_service_1 = require("../../core/can-deactivate-guard.service");
var AuthModule = (function () {
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
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map