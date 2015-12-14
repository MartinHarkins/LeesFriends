/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../typings/statehelper.d.ts" />

/// <reference path="index.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />
/// <reference path="components/header/header.directive.ts" />
/// <reference path="components/home/home.directive.ts" />
/// <reference path="components/services/services.directive.ts" />

/**
 * Created by mharkins on 12/13/15.
 */

module leesFriends {
  'use strict';

  angular.module('leesFriends.components', [])
    .directive('header', () => new HeaderDirective())
    .directive('home', () => new HomeDirective())
    .directive('services', () => new ServicesDirective());

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
    .config((stateHelperProvider, $urlRouterProvider) => new AppStates(stateHelperProvider, $urlRouterProvider))
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl);
}


