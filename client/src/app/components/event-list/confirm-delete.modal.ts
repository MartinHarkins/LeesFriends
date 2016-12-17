import {Component} from '@angular/core';

import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';

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
  styleUrls: ['confirm-delete.modal.scss'],
  template: `
<div class="container margin-top-sm">
    <div class="row">
        <div class="col-sm-12">
            <h4>Are you certain you want to delete this event?</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="unpublish">
              <p>You can instead choose to unpublish the event. It won't be visible to the public anymore.</p>
              <button class="btn btn-default" (click)="onUnpublish()">Unpublish</button>
            </div>
        </div>
    </div>
    <div class="row" >
        <div class="col-xs-12">
            <div class="pull-right buttons">
              <button class="btn btn-danger" (click)="onDelete()">Delete</button>
              <button class="btn btn-primary" (click)="onCancel()">Cancel</button>
            </div>
        </div>
    </div>
</div>`
})
export class ConfirmDeleteEventModalComponent implements ModalComponent<ConfirmDeleteEventModalComponentData> {
  context: ConfirmDeleteEventModalComponentData;

  constructor(public dialog: DialogRef<ConfirmDeleteEventModalComponentData>) {
    this.context = this.dialog.context;
  }

  onDelete(): void {
    this.dialog.close(EventDeleteAction.DELETE);
  }

  onUnpublish(): void {
    this.dialog.close(EventDeleteAction.UNPUBLISH);
  }

  onCancel(): void {
    this.dialog.close(EventDeleteAction.CANCEL);
  }
}
