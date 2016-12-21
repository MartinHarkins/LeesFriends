"use strict";
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_datepicker_1 = require("ng2-datepicker");
var event_1 = require("../../models/event");
var events_service_1 = require("../../services/events.service");
var tiny_directive_1 = require("../../directives/tiny.directive");
var _ = require("lodash");
var RxUtils_1 = require("../../core/utils/RxUtils");
var EventEditorComponent = (function () {
    function EventEditorComponent(fb, changeDetectorRef, service, elementRef) {
        this.fb = fb;
        this.changeDetectorRef = changeDetectorRef;
        this.service = service;
        this.elementRef = elementRef;
        this.onEventAdded = new core_1.EventEmitter();
        this.onEventUpdated = new core_1.EventEmitter();
        this.onEditCancel = new core_1.EventEmitter();
        this.isEditing = false;
        // TODO: extract
        this.DATE_FORMAT = 'MM/DD/YYYY';
        this.formErrors = {
            'title': '',
            'date': '',
            'content': ''
        };
        this.validationMessages = {
            'title': {
                'required': 'Set a title for the event.'
            },
            'date': {
                'required': 'Set a date for the event.'
            },
            'content': {
                'required': 'Set a content for the event.'
            }
        };
    }
    EventEditorComponent.prototype.ngOnInit = function () {
        // Initialize date picker
        this.datepickerOptions = new ng2_datepicker_1.DatePickerOptions({
            format: this.DATE_FORMAT
        });
        this.reset();
    };
    EventEditorComponent.prototype.ngAfterViewInit = function () {
        // enable on of date field to open picker
        var hostElem = this.elementRef.nativeElement;
        var dateInput = hostElem.querySelector('.datepicker-input');
        var dateIcon = hostElem.querySelector('.datepicker-input-icon');
        dateInput.addEventListener('click', function () { return dateIcon.click(); });
        dateInput.addEventListener('keypress', function (event) { return event.preventDefault(); });
    };
    /**
     * Reset the form
     */
    EventEditorComponent.prototype.reset = function () {
        // If we have an existing `event`, toggle edit state.
        if (this.event) {
            this.isEditing = true;
        }
        else {
            this.isEditing = false;
            this.event = new event_1.Event('', '', new Date());
        }
        // Clone object in order to check for changes later.
        this.originalEvent = event_1.Event.clone(this.event);
        this.tinyDateModel = tiny_directive_1.TinymceEditorDirective.buildDateModel(this.DATE_FORMAT, this.event.date);
        this.buildForm();
    };
    EventEditorComponent.prototype.buildForm = function () {
        var _this = this;
        this.eventEditForm = this.fb.group({
            'title': [this.event.title, [forms_1.Validators.required]],
            'date': [this.event.date, [forms_1.Validators.required]],
            'content': [this.event.content, [forms_1.Validators.required]]
        });
        this.valueChangeSubscription = this.eventEditForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    EventEditorComponent.prototype.onValueChanged = function (data) {
        if (!this.eventEditForm)
            return;
        var form = this.eventEditForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
        // Purposefully redetecting changes after the `onValueChanged` is called.
        // Reason:
        //  when the tinymce editor removes itself,
        //  the form considers it a value change,
        //  and `onValueChanged` is called at a time when the actual editor is already destroyed.
        //  > Crash
        this.changeDetectorRef.detectChanges();
    };
    /**
     * Called when the form is submitted
     */
    EventEditorComponent.prototype.onSaveDraft = function () {
        // Update event model
        _.assignIn(this.event, {
            date: this.tinyDateModel.momentObj.toDate(),
            published: false
        });
        if (!this.isEditing) {
            this.add(this.event);
        }
        else {
            this.update(this.event);
        }
    };
    EventEditorComponent.prototype.onPublish = function () {
        // Update event model
        _.assignIn(this.event, {
            date: this.tinyDateModel.momentObj.toDate(),
            published: true
        });
        if (!this.isEditing) {
            this.add(this.event);
        }
        else {
            this.update(this.event);
        }
    };
    /**
     * Called when the use cancels
     */
    EventEditorComponent.prototype.onCancel = function () {
        // Needed to prevent onValueChanged() to be called anymore.
        // `this.changeDetectorRef.detectChanges();` crashes the dom if tinymce is destroyed when it's called.
        this.valueChangeSubscription.unsubscribe();
        this.onEditCancel.emit();
    };
    /**
     * Send new event to backend
     *
     * @param newEvent the new event model
     */
    EventEditorComponent.prototype.add = function (newEvent) {
        var _this = this;
        var that = this;
        if (newEvent.published) {
            this.message = 'Saving draft ...';
        }
        else {
            this.message = 'Publishing event ...';
        }
        // TODO: handle errors
        RxUtils_1.RxUtils.ensureMinDuration(this.service.addEvent(newEvent), 1000)
            .subscribe(function () {
            _this.onEventAdded.emit(newEvent);
            // Clear the form
            that.event = null;
            that.reset();
        }, function (err) {
            console.error('Error adding event', err);
            _this.message = 'Sorry, we could not save the event.';
        });
    };
    /**
     * Send the updated event
     *
     * @param event the updated event
     */
    EventEditorComponent.prototype.update = function (event) {
        var _this = this;
        this.message = 'Updating event ...';
        // TODO: handle errors properly
        RxUtils_1.RxUtils.ensureMinDuration(this.service.updateEvent(event), 1000)
            .subscribe(function (updatedEvent) { return _this.onEventUpdated.emit(updatedEvent); }, function (err) {
            console.error('Error updating event', err);
            _this.message = 'Sorry, we could not update the event.';
        });
    };
    EventEditorComponent.prototype.hasChanges = function () {
        return !(_.isEqual(this.originalEvent.title, this.event.title)
            && _.isEqual(this.originalEvent.date, this.event.date)
            && _.isEqual(this.originalEvent.content, this.event.title));
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventEditorComponent.prototype, "onEventAdded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventEditorComponent.prototype, "onEventUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventEditorComponent.prototype, "onEditCancel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', event_1.Event)
    ], EventEditorComponent.prototype, "event", void 0);
    EventEditorComponent = __decorate([
        core_1.Component({
            selector: 'event-editor',
            templateUrl: 'event-editor.html',
            styleUrls: ['event-editor.scss']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, core_1.ChangeDetectorRef, events_service_1.EventsService, core_1.ElementRef])
    ], EventEditorComponent);
    return EventEditorComponent;
}());
exports.EventEditorComponent = EventEditorComponent;
//# sourceMappingURL=event-editor.component.js.map