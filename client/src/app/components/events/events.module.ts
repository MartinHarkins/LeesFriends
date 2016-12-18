import {NgModule} from "@angular/core";
import {EventItemComponent} from "../event-item/event-item";
import {EventListComponent} from "../event-list/event-list";
import {EventEditorComponent} from "../event-editor/event-editor";
import {ConfirmDeleteEventModalComponent} from "../event-list/confirm-delete.modal";
import {EventsService} from "../../services/events.service";
import {EventsComponent} from "./events";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TinymceEditorDirective} from "../../directives/tiny.directive";
import {DatePickerModule} from "ng2-datepicker";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";

@NgModule({
  declarations: [
    EventsComponent,
    EventEditorComponent,
    EventListComponent,
    EventItemComponent,
    ConfirmDeleteEventModalComponent,
    TinymceEditorDirective
  ],
  providers: [
    EventsService
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DatePickerModule,
    ModalModule.forRoot([ConfirmDeleteEventModalComponent]),
    BootstrapModalModule
  ],
  exports: [
    EventsComponent,
    EventEditorComponent,
    EventListComponent
  ]
})
export class EventsModule {

}
