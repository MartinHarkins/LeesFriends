"use strict";
var Event = (function () {
    function Event(title, content, date, published) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.published = false;
        this.published = published || false;
    }
    return Event;
}());
exports.Event = Event;
