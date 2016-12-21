"use strict";
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var _ = require("lodash");
var auth_restangular_service_1 = require("../core/auth/auth-restangular.service");
/**
 * Service used to interact with the `/events` api
 */
var EventsService = (function () {
    function EventsService(restangular) {
        this.restangular = restangular;
    }
    /**
     * Retrieve the list of events by date
     *
     * @returns {Observable<Event[]>}
     */
    EventsService.prototype.getEventsByDateDesc = function (opt) {
        var query = {
            includeDrafts: opt ? opt.includeDrafts : false
        };
        // TODO: handle error
        // TODO: needs to send date sorting as a parameter.
        return this.restangular.all('events').getList(query);
    };
    /**
     * Add a new event
     *
     * @param newEvent the event to be added
     * @returns {Observable<Event>} the added event
     */
    EventsService.prototype.addEvent = function (newEvent) {
        // TODO: handle error
        return this.getAllRestangularizedEvents()
            .switchMap(function (events) { return events.post({ event: newEvent }); });
    };
    /**
     * Get's all the events including drafts.
     *
     * @returns {any}
     */
    EventsService.prototype.getAllRestangularizedEvents = function () {
        return this.restangular.all('events').getList({ includeDrafts: true });
    };
    /**
     * Update an event
     *
     * @param updatedEvent the event to be updated
     * @returns {Observable<Event>} the updated event
     */
    EventsService.prototype.updateEvent = function (updatedEvent) {
        // TODO: handle error
        return this.getAllRestangularizedEvents()
            .switchMap(function (events) {
            for (var i = 0; i < events.length; i++) {
                var event_1 = events[i];
                if (event_1._id == updatedEvent._id) {
                    _.assignIn(event_1, updatedEvent);
                    return event_1.put();
                }
            }
            return rxjs_1.Observable.throw(new Error('Could not find matching event'));
        });
    };
    /**
     * Update an event
     *
     * @param updatedEvent the event to be updated
     * @returns {Observable<Event>} the updated event
     */
    EventsService.prototype.deleteEvent = function (updatedEvent) {
        // TODO: handle error
        return this.getAllRestangularizedEvents()
            .switchMap(function (events) {
            for (var i = 0; i < events.length; i++) {
                var event_2 = events[i];
                if (event_2._id == updatedEvent._id) {
                    return event_2.remove();
                }
            }
            return rxjs_1.Observable.throw(new Error('Could not find matching event'));
        });
    };
    EventsService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(auth_restangular_service_1.AuthRestangular)), 
        __metadata('design:paramtypes', [Object])
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map