import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TinymceEditorDirective} from "../../directives/tiny.directive";
import {ModalModule} from "ngx-modialog";
import {BootstrapModalModule} from "ngx-modialog/plugins/bootstrap";

import {EventListEditableComponent} from "../event-list/event-list-editable.component";
import {EventEditorComponent} from "../../admin/event-editor/event-editor.component";
import {ConfirmDeleteEventModalComponent} from "../event-list/confirm-delete.modal";
import {EventsService} from "../../services/events.service";
import {EventListComponent} from "../event-list/event-list.component";
import {EventItemComponent} from "../event-item/event-item.component";
import {AuthModule} from "../../core/auth/auth.module";

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
