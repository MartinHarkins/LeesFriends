"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../core/auth/auth.service");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AdminComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(["/"]);
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            styles: ["\n    ul.menu {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n "],
            template: "\n<div class=\"container-fluid\">\n    <div class=\"col-lg-1\">\n        <ul class=\"menu\">\n            <li>\n               <a [routerLink]=\"['events']\"><h2>Events</h2></a>\n            </li>\n            <li class=\"margin-top-md\">\n                <button type=\"button\" class=\"btn btn-default\" (click)=\"logout()\">Logout</button>\n            </li>\n        </ul>\n    </div>\n    <div class=\"col-lg-11\">\n        <router-outlet></router-outlet>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map