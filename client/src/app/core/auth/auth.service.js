"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.Enum = void 0;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var core_2 = require("angular2-cookie/core");
var ng2_restangular_1 = require("ng2-restangular");
var Enum = /** @class */ (function () {
    function Enum(value) {
        this.value = value;
    }
    Enum.prototype.toString = function () {
        return this.value.toString();
    };
    return Enum;
}());
exports.Enum = Enum;
var AuthCookieKeys = /** @class */ (function (_super) {
    __extends(AuthCookieKeys, _super);
    function AuthCookieKeys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // values
    AuthCookieKeys.USER = new AuthCookieKeys("USER");
    AuthCookieKeys.TOKEN = new AuthCookieKeys("JWT_TOKEN");
    return AuthCookieKeys;
}(Enum));
var AuthUserInfo = /** @class */ (function () {
    function AuthUserInfo(username, bearer) {
        this.username = username;
        this.bearer = bearer;
    }
    return AuthUserInfo;
}());
var AuthService = /** @class */ (function () {
    function AuthService(cookieService, restangular) {
        this.cookieService = cookieService;
        this.restangular = restangular;
        this.isLoggedIn = false;
        // this.cookieService.removeAll();
        var authUserInfo = this.cookieService.get(AuthCookieKeys.TOKEN.toString());
        if (authUserInfo) {
            this.isLoggedIn = true;
        }
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        return this.restangular.all('authenticate').customPOST({ username: username, password: password })
            .map(function (response) {
            _this.cookieService.put(AuthCookieKeys.TOKEN.toString(), response.token);
            _this.isLoggedIn = true;
            return Observable_1.Observable.of(true);
        })
            .catch(function (err) {
            console.error('Error logging in', err);
            return Observable_1.Observable.of(false);
        });
    };
    AuthService.prototype.logout = function () {
        this.cookieService.remove(AuthCookieKeys.TOKEN.toString());
        this.isLoggedIn = false;
    };
    AuthService.prototype.getToken = function () {
        return this.cookieService.get(AuthCookieKeys.TOKEN.toString());
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.CookieService, ng2_restangular_1.Restangular])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map