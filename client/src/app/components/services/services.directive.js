var leesFriends;
(function (leesFriends) {
    'use strict';
    var ServicesDirective = (function () {
        function ServicesDirective() {
            this.restrict = 'E';
            this.templateUrl = 'app/components/services/services.html';
        }
        return ServicesDirective;
    })();
    leesFriends.ServicesDirective = ServicesDirective;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=services.directive.js.map