/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="../typings/statehelper.d.ts" />
var leesFriends;
(function (leesFriends) {
    'use strict';
    var AppStates = (function () {
        function AppStates($stateHelperProvider, $urlRouterProvider) {
            $stateHelperProvider
                .state({
                name: 'home',
                url: '/home',
                template: '<home></home>'
            })
                .state({
                name: 'services',
                url: '/services',
                template: '<services></services>'
            });
            $urlRouterProvider.otherwise('/home');
        }
        return AppStates;
    })();
    leesFriends.AppStates = AppStates;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=index.js.map