"use strict";
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var tiny_directive_1 = require("../../directives/tiny.directive");
var ng2_datepicker_1 = require("ng2-datepicker");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var event_list_editable_component_1 = require("../event-list/event-list-editable.component");
var event_editor_component_1 = require("../../admin/event-editor/event-editor.component");
var confirm_delete_modal_1 = require("../event-list/confirm-delete.modal");
var events_service_1 = require("../../services/events.service");
var event_list_component_1 = require("../event-list/event-list.component");
var event_item_component_1 = require("../event-item/event-item.component");
var auth_module_1 = require("../../core/auth/auth.module");
var EventsModule = (function () {
    function EventsModule() {
    }
    EventsModule = __decorate([
        core_1.NgModule({
            declarations: [
                event_list_component_1.EventListComponent,
                event_item_component_1.EventItemComponent,
                event_editor_component_1.EventEditorComponent,
                event_list_editable_component_1.EventListEditableComponent,
                confirm_delete_modal_1.ConfirmDeleteEventModalComponent,
                tiny_directive_1.TinymceEditorDirective
            ],
            providers: [
                events_service_1.EventsService
            ],
            imports: [
                auth_module_1.AuthModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                ng2_datepicker_1.DatePickerModule,
                angular2_modal_1.ModalModule.forRoot([confirm_delete_modal_1.ConfirmDeleteEventModalComponent]),
                bootstrap_1.BootstrapModalModule
            ],
            exports: [
                event_editor_component_1.EventEditorComponent,
                event_list_editable_component_1.EventListEditableComponent,
                event_list_component_1.EventListComponent,
                event_item_component_1.EventItemComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], EventsModule);
    return EventsModule;
}());
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map