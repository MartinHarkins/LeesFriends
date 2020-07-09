import {Component, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {Observable} from "rxjs";
import {Modal} from "ngx-modialog/plugins/bootstrap";
import {EventEditorComponent} from "../event-editor/event-editor.component";
import {CanDeactivateGuard} from "../../core/can-deactivate-guard.service";
import {EventListEditableComponent} from "../../components/event-list/event-list-editable.component";

@Component({
  selector: 'admin-events',
  template: `
    <div class="container">
      <div class="row">
        <event-editor (onEventAdded)="onNewEvent($event)"></event-editor>
      </div>
      <event-list-editable [editable]="true"></event-list-editable>
    </div>`
})
export class AdminEventsComponent implements OnInit, CanDeactivateGuard {
  @ViewChild(EventListEditableComponent)
  private eventList: EventListEditableComponent;
  @ViewChild(EventEditorComponent)
  private eventEditor: EventEditorComponent;

  constructor(vcRef: ViewContainerRef, public modal: Modal) {
    // modal.overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
  }

  /**
   * Called when a new event has been added
   *
   * @param event the event that was added.
   */
  onNewEvent(event) {
    this.eventList.reloadList();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.eventEditor.hasChanges()
      || this.eventList.hasChanges()) {
      return this.modal.confirm()
        .size('sm')
        .body('Discard Changes?')
        .open().result
        .catch(err => {
          // An error is thrown when the user cancels the dialog.
          // That's because the dialog returns `undefined`
          console.debug('Error returning from dialog.', err);
        });
    }
    return true;
  }
}
