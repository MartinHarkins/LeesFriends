var leesFriends;
(function (leesFriends) {
    'use strict';
    var HeaderController = (function () {
        function HeaderController() {
        }
        HeaderController.prototype.print = function (text) {
            console.log(text);
        };
        HeaderController.prototype.getVariable = function () {
            return 'Hello!';
        };
        return HeaderController;
    })();
    var HeaderDirective = (function () {
        function HeaderDirective() {
            this.restrict = 'E';
            this.templateUrl = 'app/components/header/header.html';
            this.replace = true;
            this.controller = HeaderController;
            this.link = function (scope, element, attributes, controller) {
                controller.print("Linked!");
                scope.variable = controller.getVariable();
            };
        }
        return HeaderDirective;
    })();
    leesFriends.HeaderDirective = HeaderDirective;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=header.directive.js.map