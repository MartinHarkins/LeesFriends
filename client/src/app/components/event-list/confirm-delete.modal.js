"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDeleteEventModalComponent = exports.EventDeleteAction = exports.ConfirmDeleteEventModalComponentData = void 0;
var core_1 = require("@angular/core");
var angular2_modal_1 = require("angular2-modal");
var ConfirmDeleteEventModalComponentData = /** @class */ (function () {
    function ConfirmDeleteEventModalComponentData() {
    }
    return ConfirmDeleteEventModalComponentData;
}());
exports.ConfirmDeleteEventModalComponentData = ConfirmDeleteEventModalComponentData;
var EventDeleteAction;
(function (EventDeleteAction) {
    EventDeleteAction[EventDeleteAction["CANCEL"] = 1] = "CANCEL";
    EventDeleteAction[EventDeleteAction["DELETE"] = 2] = "DELETE";
    EventDeleteAction[EventDeleteAction["UNPUBLISH"] = 3] = "UNPUBLISH";
})(EventDeleteAction = exports.EventDeleteAction || (exports.EventDeleteAction = {}));
var ConfirmDeleteEventModalComponent = /** @class */ (function () {
    function ConfirmDeleteEventModalComponent(dialog) {
        this.dialog = dialog;
        this.context = this.dialog.context;
    }
    ConfirmDeleteEventModalComponent.prototype.onDelete = function () {
        this.dialog.close(EventDeleteAction.DELETE);
    };
    ConfirmDeleteEventModalComponent.prototype.onUnpublish = function () {
        this.dialog.close(EventDeleteAction.UNPUBLISH);
    };
    ConfirmDeleteEventModalComponent.prototype.onCancel = function () {
        this.dialog.close(EventDeleteAction.CANCEL);
    };
    ConfirmDeleteEventModalComponent = __decorate([
        core_1.Component({
            selector: 'confirm-delete-modal',
            styleUrls: ['confirm-delete.modal.scss'],
            template: "\n<div class=\"container margin-top-sm\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <h4>Are you certain you want to delete this event?</h4>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <div class=\"unpublish\">\n              <p>You can instead choose to unpublish the event. It won't be visible to the public anymore.</p>\n              <button class=\"btn btn-default\" (click)=\"onUnpublish()\">Unpublish</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\" >\n        <div class=\"col-xs-12\">\n            <div class=\"pull-right buttons\">\n              <button class=\"btn btn-danger\" (click)=\"onDelete()\">Delete</button>\n              <button class=\"btn btn-primary\" (click)=\"onCancel()\">Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>"
        }),
        __metadata("design:paramtypes", [angular2_modal_1.DialogRef])
    ], ConfirmDeleteEventModalComponent);
    return ConfirmDeleteEventModalComponent;
}());
exports.ConfirmDeleteEventModalComponent = ConfirmDeleteEventModalComponent;
//# sourceMappingURL=confirm-delete.modal.js.map