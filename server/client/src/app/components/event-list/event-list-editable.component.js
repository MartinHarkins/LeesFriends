"use strict";
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var event_1 = require("../../models/event");
var events_service_1 = require("../../services/events.service");
var _ = require("lodash");
var confirm_delete_modal_1 = require("./confirm-delete.modal");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var event_editor_component_1 = require("../../admin/event-editor/event-editor.component");
var RxUtils_1 = require("../../core/utils/RxUtils");
/**
 * A wrapper for the {@link Event} components.
 */
var EventWrapper = (function () {
    function EventWrapper(event, editing) {
        this.event = event;
        this.editing = editing;
    }
    return EventWrapper;
}());
var EventListEditableComponent = (function () {
    function EventListEditableComponent(service, vcRef, modal) {
        this.service = service;
        this.modal = modal;
        modal.overlay.defaultViewContainer = vcRef;
    }
    EventListEditableComponent.prototype.ngOnInit = function () {
        this.hasMore = false;
        this.reloadList();
    };
    /**
     * Loads up the event list and wraps it up
     */
    EventListEditableComponent.prototype.reloadList = function () {
        var _this = this;
        // Get dates in the order of decreasing dates.
        // Angular 2 doc recommends doing sorting away from template.
        this.service.getEventsByDateDesc(this.editable ? { includeDrafts: true } : undefined)
            .switchMap(function (eventList) {
            _this.allEvents = eventList;
            return _this.wrapEvents(eventList);
        })
            .subscribe(function (wrappedEvents) {
            _this.eventWrappers = wrappedEvents;
        }, function (error) {
            console.log('Error getting list of events', error);
        });
    };
    EventListEditableComponent.prototype.wrapEvents = function (events) {
        // break up event list and wrap each item. then build list up again
        var obs = rxjs_1.Observable.from(events);
        // Only take [count] elements
        if (this.count) {
            this.hasMore = events.length > this.count;
            obs = obs.take(this.count);
        }
        return obs
            .map(function (event) { return new EventWrapper(event, false); })
            .toArray();
    };
    EventListEditableComponent.prototype.loadMore = function () {
        var _this = this;
        var visibleCount = this.eventWrappers.length;
        // If all the events have already been loaded, reset hasMore flag
        if (visibleCount >= this.allEvents.length) {
            this.hasMore = false;
            return;
        }
        var eventsToLoad = this.allEvents.slice(visibleCount, visibleCount + this.count);
        this.wrapEvents(eventsToLoad)
            .switchMap(function (wrappedEvents) { return rxjs_1.Observable.from(wrappedEvents); })
            .subscribe(function (wrappedEvent) {
            _this.eventWrappers.push(wrappedEvent);
        });
    };
    /**
     * Edit an event
     *
     * @param eventWrapper
     */
    EventListEditableComponent.prototype.edit = function (eventWrapper) {
        this.toggleEdit(eventWrapper, true);
    };
    EventListEditableComponent.prototype.deleteEvent = function (eventWrapper) {
        var _this = this;
        this.modal.open(confirm_delete_modal_1.ConfirmDeleteEventModalComponent, angular2_modal_1.overlayConfigFactory({ event: eventWrapper.event }, bootstrap_1.BSModalContext))
            .then(function (dialogRef) {
            console.log('test');
            if (dialogRef.result) {
                return dialogRef.result;
            }
            throw new Error('No result');
        })
            .then(function (action) {
            if (!action) {
                return;
            }
            switch (action) {
                case confirm_delete_modal_1.EventDeleteAction.DELETE:
                    eventWrapper.message = 'Deleting event ...';
                    _this.service.deleteEvent(eventWrapper.event)
                        .subscribe(function () { return _.remove(_this.eventWrappers, eventWrapper); }, function (err) {
                        console.debug("Could not remove event", err);
                        eventWrapper.message = 'Sorry, could not delete the event. Please contact administrator.';
                    });
                    break;
                case confirm_delete_modal_1.EventDeleteAction.UNPUBLISH:
                    _this.unpublish(eventWrapper);
                    break;
                case confirm_delete_modal_1.EventDeleteAction.CANCEL:
                default:
                    break;
            }
        }, function (err) { return console.debug('Could not retrieve result.', err); });
    };
    EventListEditableComponent.prototype.unpublish = function (eventWrapper) {
        var event = event_1.Event.clone(eventWrapper.event);
        event.published = false;
        eventWrapper.message = 'Unpublishing event ...';
        RxUtils_1.RxUtils.ensureMinDuration(this.service.updateEvent(event), 1000)
            .subscribe(function (event) {
            eventWrapper.event = event;
            eventWrapper.message = '';
        }, function (err) {
            console.error('Could not unpublish event', err);
            eventWrapper.message = 'Sorry, could not unpublish the event. Please edit event or contact administrator.';
        });
    };
    EventListEditableComponent.prototype.publish = function (eventWrapper) {
        var event = event_1.Event.clone(eventWrapper.event);
        event.published = true;
        eventWrapper.message = 'Publishing event ...';
        RxUtils_1.RxUtils.ensureMinDuration(this.service.updateEvent(event), 1000)
            .subscribe(function (event) {
            eventWrapper.event = event;
            eventWrapper.message = '';
        }, function (err) {
            console.error('Could not publish event', err);
            eventWrapper.message = 'Sorry, could not publish the event. Please edit event or contact administrator.';
        });
    };
    /**
     * Called when an event was updated
     * @param eventWrapper
     */
    EventListEditableComponent.prototype.onEventUpdated = function (eventWrapper) {
        this.toggleEdit(eventWrapper, false);
    };
    /**
     * Called when an edit was cancelled
     * @param eventWrapper
     */
    EventListEditableComponent.prototype.onEditEventCancelled = function (eventWrapper) {
        this.toggleEdit(eventWrapper, false);
    };
    EventListEditableComponent.prototype.toggleEdit = function (eventWrapper, editing) {
        eventWrapper.editing = editing;
    };
    EventListEditableComponent.prototype.hasChanges = function () {
        return this.eventEditors.some(function (eventEditor) { return eventEditor.hasChanges(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventListEditableComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EventListEditableComponent.prototype, "count", void 0);
    __decorate([
        core_1.ViewChildren(event_editor_component_1.EventEditorComponent), 
        __metadata('design:type', core_1.QueryList)
    ], EventListEditableComponent.prototype, "eventEditors", void 0);
    EventListEditableComponent = __decorate([
        core_1.Component({
            selector: 'event-list-editable',
            styleUrls: ['event-list.scss'],
            template: "\n  <div class=\"row\" *ngFor=\"let eventWrapper of eventWrappers\">\n    <div *ngIf=\"editable && !eventWrapper.editing\" class=\"pull-right\">\n        <div class=\"message\">{{eventWrapper.message}}</div>\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"edit(eventWrapper)\">Edit</button>\n        <button *ngIf=\"eventWrapper.event.published\" class=\"btn btn-warning\" type=\"button\" (click)=\"unpublish(eventWrapper)\">Unpublish</button>\n        <button *ngIf=\"!eventWrapper.event.published\" class=\"btn btn-success\" type=\"button\" (click)=\"publish(eventWrapper)\">Publish</button>\n        <button class=\"btn btn-danger\" type=\"button\" (click)=\"deleteEvent(eventWrapper)\">Delete</button>\n    </div>\n    \n    <event-item *ngIf=\"!eventWrapper.editing\" [event]=\"eventWrapper.event\"></event-item>\n    \n    <event-editor *ngIf=\"editable && eventWrapper.editing\" [event]=\"eventWrapper.event\" (onEventUpdated)=\"onEventUpdated(eventWrapper)\" (onEditCancel)=\"onEditEventCancelled(eventWrapper)\"></event-editor>\n    <hr/>\n  </div>\n  <div *ngIf=\"hasMore\" class=\"more\">\n    <a (click)=\"loadMore()\"><strong>More...</strong></a> \n  </div>"
        }), 
        __metadata('design:paramtypes', [events_service_1.EventsService, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], EventListEditableComponent);
    return EventListEditableComponent;
}());
exports.EventListEditableComponent = EventListEditableComponent;
//# sourceMappingURL=event-list-editable.component.js.map