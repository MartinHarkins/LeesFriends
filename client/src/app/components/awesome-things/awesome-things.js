/**
 * Created by mharkins on 3/20/16.
 */
var leesFriends;
(function (leesFriends) {
    var ATController = (function () {
        function ATController() {
            // Can do things with the list here
        }
        ATController.prototype.print = function (text) {
            console.log(text);
        };
        ATController.prototype.getVariable = function () {
            return 'Hello!';
        };
        return ATController;
    })();
    var ATComponent = (function () {
        function ATComponent() {
            this.bindings = {
                list: '<'
            };
            this.templateUrl = 'app/components/awesome-things/awesome-things.html';
            this.controller = ATController;
        }
        return ATComponent;
    })();
    leesFriends.ATComponent = ATComponent;
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=awesome-things.js.map