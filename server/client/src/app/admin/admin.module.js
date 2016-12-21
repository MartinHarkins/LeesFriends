"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var admin_router_module_1 = require("./admin-router.module");
var admin_component_1 = require("./admin.component");
var users_service_1 = require("../services/users.service");
var events_module_1 = require("../components/events/events.module");
var events_component_1 = require("./events/events.component");
var admin_welcome_1 = require("./admin.welcome");
var ng2_restangular_1 = require("ng2-restangular");
var auth_module_1 = require("../core/auth/auth.module");
var auth_service_1 = require("../core/auth/auth.service");
var auth_restangular_service_1 = require("../core/auth/auth-restangular.service");
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                admin_component_1.AdminComponent,
                events_component_1.AdminEventsComponent,
                admin_welcome_1.AdminWelcomeComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                auth_module_1.AuthModule,
                events_module_1.EventsModule,
                admin_router_module_1.AdminRoutingModule
            ],
            providers: [
                users_service_1.UsersService,
                {
                    provide: auth_restangular_service_1.AuthRestangular,
                    useFactory: auth_restangular_service_1.AuthRestangularFactory,
                    deps: [ng2_restangular_1.Restangular, auth_service_1.AuthService]
                }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map