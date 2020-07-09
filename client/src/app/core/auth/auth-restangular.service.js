"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRestangularFactory = exports.AuthRestangular = void 0;
var core_1 = require("@angular/core");
/**
 * A restangular service configured to connect to authenticated apis.
 */
exports.AuthRestangular = new core_1.OpaqueToken('AuthRestangular');
function AuthRestangularFactory(restangular, authService) {
    return restangular.withConfig(function (RestangularConfigurer) {
        console.log('setting up AuthRestangular');
        RestangularConfigurer.setDefaultHeaders({
            'x-access-token': authService.getToken()
        });
        console.log('did set up AuthRestangular');
    });
}
exports.AuthRestangularFactory = AuthRestangularFactory;
//# sourceMappingURL=auth-restangular.service.js.map