/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../typings/statehelper.d.ts" />
/// <reference path="index.ts" />
/// <reference path="models/thing.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />
/// <reference path="components/header/header.directive.ts" />
/// <reference path="components/home/home.ts" />
/// <reference path="../app/components/awesome-things/awesome-things.ts" />
/// <reference path="components/services/services.directive.ts" />
/**
 * Created by mharkins on 12/13/15.
 */
var leesFriends;
(function (leesFriends) {
    'use strict';
    angular.module('leesFriends.components', [])
        .component('home', new leesFriends.HomeComponent())
        .component('awesomeThings', new leesFriends.ATComponent())
        .directive('header', function () { return new leesFriends.HeaderDirective(); })
        .directive('services', function () { return new leesFriends.ServicesDirective(); });
    angular.module('leesFriends', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'restangular',
        'ui.router',
        'ui.router.stateHelper',
        'ui.bootstrap',
        'leesFriends.components'
    ])
        .config(function (stateHelperProvider, $urlRouterProvider) { return new leesFriends.AppStates(stateHelperProvider, $urlRouterProvider); })
        .controller('MainCtrl', leesFriends.MainCtrl)
        .controller('NavbarCtrl', leesFriends.NavbarCtrl);
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=modules.js.map