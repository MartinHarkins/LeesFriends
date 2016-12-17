import { Component } from '@angular/core';

import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class ConfirmDeleteEventModalComponentData {
  public event: Event;
}

export enum EventDeleteAction {
  CANCEL = 1,
  DELETE,
  UNPUBLISH
}

@Component({
  selector: 'confirm-delete-modal',
  template: `
<div class="container-fluid">
    <div class="row custom-modal-header">
        <div class="col-sm-12">
            <h1>Are you sure you want to delete this event?</h1>
        </div>
    </div>
    <div class="row">
        <event-item [event]="context.event"></event-item>
    </div>
    <div class="row" >
        <div class="col-xs-12">
            <button class="btn btn-danger" (click)="onDelete()">Delete</button>
            <button class="btn btn-info" (click)="onUnpublish()">Unpublish</button>
            <button class="btn btn-primary" (click)="onCancel()">Cancel</button>
        </div>
    </div>
</div>`
})
export class ConfirmDeleteEventModalComponent implements ModalComponent<ConfirmDeleteEventModalComponentData> {
  context: ConfirmDeleteEventModalComponentData;

  constructor(public dialog: DialogRef<ConfirmDeleteEventModalComponentData>) {
    this.context = this.dialog.context;
  }

  onDelete():void {
    this.dialog.close(EventDeleteAction.DELETE);
  }
  onUnpublish():void {
    this.dialog.close(EventDeleteAction.UNPUBLISH);
  }
  onCancel():void {
    this.dialog.close(EventDeleteAction.CANCEL);
  }
}
