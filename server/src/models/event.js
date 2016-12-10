"use strict";
var Event = (function () {
    function Event(title, content, date) {
        this.title = title;
        this.content = content;
        this.date = date;
    }
    return Event;
}());
exports.Event = Event;
