"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutingModule = void 0;
var core_1 = require("@angular/core");
var admin_component_1 = require("./admin.component");
var router_1 = require("@angular/router");
var events_component_1 = require("./events/events.component");
var admin_welcome_1 = require("./admin.welcome");
var auth_guard_service_1 = require("../core/auth/auth-guard.service");
var can_deactivate_guard_service_1 = require("../core/can-deactivate-guard.service");
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: 'admin',
                        component: admin_component_1.AdminComponent,
                        canActivate: [auth_guard_service_1.AuthGuard],
                        children: [
                            {
                                path: '',
                                component: admin_welcome_1.AdminWelcomeComponent
                            },
                            {
                                path: 'events',
                                component: events_component_1.AdminEventsComponent,
                                canDeactivate: [can_deactivate_guard_service_1.CanDeactivateGuard]
                            }
                        ]
                    }
                ])
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
//# sourceMappingURL=admin-router.module.js.map