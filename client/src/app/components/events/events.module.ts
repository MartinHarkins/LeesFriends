import {NgModule} from "@angular/core";
import {EventListEditableComponent} from "../event-list/event-list-editable";
import {EventEditorComponent} from "../event-editor/event-editor";
import {ConfirmDeleteEventModalComponent} from "../event-list/confirm-delete.modal";
import {EventsService} from "../../services/events.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TinymceEditorDirective} from "../../directives/tiny.directive";
import {DatePickerModule} from "ng2-datepicker";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {EventListComponent} from "../event-list/event-list";
import {EventItemComponent} from "../event-item/event-item";
import {AdminModule} from "../admin/admin.module";
import {AuthModule} from "../../core/auth/auth.module";
import {AuthService} from "../../core/auth/auth.service";
import {Restangular} from "ng2-restangular";

@NgModule({
  declarations: [
    EventListComponent,
    EventItemComponent,
    EventEditorComponent,
    EventListEditableComponent,
    ConfirmDeleteEventModalComponent,
    TinymceEditorDirective
  ],
  providers: [
    EventsService
  ],
  imports: [
    AuthModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ModalModule.forRoot([ConfirmDeleteEventModalComponent]),
    BootstrapModalModule
  ],
  exports: [
    EventEditorComponent,
    EventListEditableComponent,
    EventListComponent,
    EventItemComponent
  ]
})
export class EventsModule {

}
