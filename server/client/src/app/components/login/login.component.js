"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("../../core/auth/auth.service");
var RxUtils_1 = require("../../core/utils/RxUtils");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            var redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
            // Redirect the user
            this.router.navigate([redirect]);
            return;
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.message = 'Logging in ...';
        RxUtils_1.RxUtils.ensureMinDuration(this.authService.login(this.username, this.password), 1000)
            .subscribe(function (isSuccessful) {
            if (!isSuccessful) {
                _this.message = 'Failed to log in.';
            }
            if (_this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/admin';
                // Redirect the user
                _this.router.navigate([redirect]);
            }
        }, function (err) {
            _this.message = 'Failed to log in.';
            console.error('Could not log in', err);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            styles: [" \n.message {\n    margin-left: 1em;\n    display: inline-block;\n}\n"],
            template: "\n<div class=\"container\">\n    <div class=\"col-lg-3\"></div>\n    <div class=\"col-lg-6\">\n      <div class=\"row\">\n          <form (ngSubmit)=\"login()\" #loginForm=\"ngForm\">\n              <div class=\"form-group\">\n                <label for=\"username\">Username:</label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" id=\"username\" name=\"username\" required #usernameInput=\"ngModel\"/>\n                \n                <div [hidden]=\"usernameInput.valid || usernameInput.pristine\" class=\"text-danger\">\n                  Username is required.\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"password\">Password:</label>\n                <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" id=\"password\" name=\"password\" required #passwordInput=\"ngModel\"/>\n                \n                <div [hidden]=\"passwordInput.valid || passwordInput.pristine\" class=\"text-danger\">\n                  Password is required.\n                </div>\n              </div>\n\n              <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!loginForm.form.valid\">Login</button>\n              <div class=\"message\">{{message}}</div>\n          </form>\n      </div>\n    </div>\n    <div class=\"col-lg-3\"></div>\n</div>"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map