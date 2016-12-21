"use strict";
var core_1 = require("@angular/core");
var modal_1 = require("angular2-modal/plugins/bootstrap/modal");
var event_editor_component_1 = require("../event-editor/event-editor.component");
var event_list_editable_component_1 = require("../../components/event-list/event-list-editable.component");
var AdminEventsComponent = (function () {
    function AdminEventsComponent(vcRef, modal) {
        this.modal = modal;
        modal.overlay.defaultViewContainer = vcRef;
    }
    AdminEventsComponent.prototype.ngOnInit = function () {
    };
    /**
     * Called when a new event has been added
     *
     * @param event the event that was added.
     */
    AdminEventsComponent.prototype.onNewEvent = function (event) {
        this.eventList.reloadList();
    };
    AdminEventsComponent.prototype.canDeactivate = function () {
        if (this.eventEditor.hasChanges()
            || this.eventList.hasChanges()) {
            return this.modal.confirm()
                .size('sm')
                .body('Discard Changes?')
                .open()
                .then(function (dialogRef) { return dialogRef.result; })
                .catch(function (err) {
                // An error is thrown when the user cancels the dialog.
                // That's because the dialog returns `undefined`
                console.debug('Error returning from dialog.', err);
            });
        }
        return true;
    };
    __decorate([
        core_1.ViewChild(event_list_editable_component_1.EventListEditableComponent), 
        __metadata('design:type', event_list_editable_component_1.EventListEditableComponent)
    ], AdminEventsComponent.prototype, "eventList", void 0);
    __decorate([
        core_1.ViewChild(event_editor_component_1.EventEditorComponent), 
        __metadata('design:type', event_editor_component_1.EventEditorComponent)
    ], AdminEventsComponent.prototype, "eventEditor", void 0);
    AdminEventsComponent = __decorate([
        core_1.Component({
            selector: 'admin-events',
            template: "\n<div class=\"container\">\n  <div class=\"row\">\n    <event-editor (onEventAdded)=\"onNewEvent($event)\"></event-editor>\n  </div>\n  <event-list-editable [editable]=\"true\"></event-list-editable>\n</div>"
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, modal_1.Modal])
    ], AdminEventsComponent);
    return AdminEventsComponent;
}());
exports.AdminEventsComponent = AdminEventsComponent;
//# sourceMappingURL=events.component.js.map