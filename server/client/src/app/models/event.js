"use strict";
var Event = (function () {
    function Event(title, content, date, published, _id) {
        this.title = title;
        this.content = content;
        this.date = date;
        this._id = _id;
        this.published = false;
        this.published = published || false;
    }
    Event.clone = function (base) {
        return new Event(base.title, base.content, base.date, base.published, base._id);
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=event.js.map