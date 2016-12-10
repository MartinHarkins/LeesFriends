"use strict";
/** @ngInject */
var Thing = (function () {
    function Thing(title, url, description, logo) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.logo = logo;
        //this.rank = Math.random();
    }
    return Thing;
}());
exports.Thing = Thing;
//# sourceMappingURL=thing.js.map