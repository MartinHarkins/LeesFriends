var leesFriends;
(function (leesFriends) {
    'use strict';
    var Thing = (function () {
        function Thing(title, url, description, logo) {
            this.title = title;
            this.url = url;
            this.description = description;
            this.logo = logo;
            this.rank = Math.random();
        }
        return Thing;
    })();
})(leesFriends || (leesFriends = {}));
//# sourceMappingURL=thing.js.map