var leesFriends;
(function (leesFriends) {
    'use strict';
    var NavbarCtrl = (function () {
        /* @ngInject */
        function NavbarCtrl($scope) {
            $scope.date = new Date();
        }
        return NavbarCtrl;
    })();
    leesFriends.NavbarCtrl = NavbarCtrl;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=navbar.controller.js.map