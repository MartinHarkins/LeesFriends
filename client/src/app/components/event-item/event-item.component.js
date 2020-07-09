"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventItemComponent = void 0;
var event_1 = require("../../models/event");
var core_1 = require("@angular/core");
var moment = require("moment");
var EventItemComponent = /** @class */ (function () {
    function EventItemComponent() {
    }
    EventItemComponent.prototype.ngOnInit = function () {
        console.log('Event:', this.event);
        // TODO: export date format. (create date utils)
        this.formattedDate = moment(this.event.date).format('MM/DD/YYYY');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", event_1.Event)
    ], EventItemComponent.prototype, "event", void 0);
    EventItemComponent = __decorate([
        core_1.Component({
            selector: 'event-item',
            styles: ["\n    .event-item {\n        padding: 10px;\n        padding-bottom: 5px;\n    }\n    \n    // Styles needed to correct tinymce alignment\n    /deep/ .content img[align=\"center\"] {\n          display: block;\n          margin-left: auto;\n          margin-right: auto;\n    }\n    /deep/ .content *[align=\"left\"] {\n        text-align: left;\n    }\n    /deep/ .content *[align=\"center\"] {\n        text-align: center;\n    }\n    /deep/ .content *[align=\"right\"] {\n        text-align: right;\n    }\n    /deep/ .content *[align=\"justify\"] {\n        text-align: justify;\n    }\n"],
            template: "\n<div class=\"event-item\">\n  <h5><span *ngIf=\"!event.published\" class=\"text-warning\">DRAFT - </span>{{event.title}} - {{formattedDate}}</h5>\n  <div class=\"content margin-top-sm\" [innerHTML]=\"event.content\"></div>\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], EventItemComponent);
    return EventItemComponent;
}());
exports.EventItemComponent = EventItemComponent;
//# sourceMappingURL=event-item.component.js.map