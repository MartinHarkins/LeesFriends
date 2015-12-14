/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />
/// <reference path="components/header/header.directive.ts" />

/**
 * Created by mharkins on 12/13/15.
 */

module leesFriends {
  'use strict';

  angular.module('leesFriends.components', [])
    .directive('header', () => new HeaderDirective());

  angular.module('leesFriends', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'restangular',
      'ui.router',
      'ui.bootstrap',
      'leesFriends.components'
    ])
    .controller('MainCtrl', MainCtrl)
    .controller('NavbarCtrl', NavbarCtrl);
}


