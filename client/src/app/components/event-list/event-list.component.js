"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var public_service_1 = require("../../services/public.service");
var EventListComponent = /** @class */ (function () {
    function EventListComponent(service) {
        this.service = service;
    }
    EventListComponent.prototype.ngOnInit = function () {
        this.hasMore = false;
        this.message = 'Events ...';
        this.reloadList();
    };
    /**
     * Loads up the event list and wraps it up
     */
    EventListComponent.prototype.reloadList = function () {
        var _this = this;
        // Get dates in the order of decreasing dates.
        // Angular 2 doc recommends doing sorting away from template.
        this.service.getEventsByDateDesc()
            .switchMap(function (eventList) {
            _this.allEvents = eventList;
            return _this.trim(eventList);
        })
            .subscribe(function (events) {
            _this.visibleEvents = events;
            if (_this.visibleEvents.length == 0) {
                _this.message = "Sorry, we couldn't load the list of events";
            }
            else {
                _this.message = '';
            }
        }, function (error) {
            console.log('Error getting list of events', error);
            if (_this.visibleEvents.length == 0) {
                _this.message = "Sorry, we couldn't load the list of events";
            }
        });
    };
    /**
     * Trim the number of events based on [count]
     */
    EventListComponent.prototype.trim = function (events) {
        var obs = rxjs_1.Observable.from(events);
        // Only take [count] elements
        if (this.count) {
            this.hasMore = events.length > this.count;
            obs = obs.take(this.count);
        }
        return obs
            .toArray();
    };
    EventListComponent.prototype.loadMore = function () {
        var _this = this;
        var visibleCount = this.visibleEvents.length;
        // If all the events have already been loaded, reset hasMore flag
        if (visibleCount >= this.allEvents.length) {
            this.hasMore = false;
            return;
        }
        var eventsToLoad = this.allEvents.slice(visibleCount, visibleCount + this.count);
        this.trim(eventsToLoad)
            .switchMap(function (events) { return rxjs_1.Observable.from(events); })
            .subscribe(function (event) { return _this.visibleEvents.push(event); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], EventListComponent.prototype, "count", void 0);
    EventListComponent = __decorate([
        core_1.Component({
            selector: 'event-list',
            styleUrls: ['event-list.scss'],
            template: "\n  <div *ngIf=\"message\" class=\"message\">\n    {{ message }}\n  </div>\n  <div class=\"row\" *ngFor=\"let event of visibleEvents\">\n    <event-item [event]=\"event\"></event-item>\n    <hr/>\n  </div>\n  <div *ngIf=\"hasMore\" class=\"more\">\n    <a (click)=\"loadMore()\"><strong>More...</strong></a> \n  </div>"
        }),
        __metadata("design:paramtypes", [public_service_1.PublicService])
    ], EventListComponent);
    return EventListComponent;
}());
exports.EventListComponent = EventListComponent;
//# sourceMappingURL=event-list.component.js.map