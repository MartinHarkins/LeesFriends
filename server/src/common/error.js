"use strict";
var Error = (function () {
    function Error(message, obj) {
        this.message = message;
        this.obj = obj;
    }
    return Error;
}());
exports.Error = Error;
