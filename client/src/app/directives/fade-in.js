"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FadeInDirective = void 0;
var core_1 = require("@angular/core");
/**
 * Created by mharkins on 6/19/16.
 */
var FadeInDirective = /** @class */ (function () {
    function FadeInDirective(el) {
        this.el = el;
    }
    FadeInDirective.prototype.ngAfterViewInit = function () {
        var that = this;
        this.el.nativeElement.classList.add('ng-hide-remove');
        this.el.nativeElement.onload = function () {
            console.log('Loaded');
            that.el.nativeElement.classList.add('ng-hide-add');
        };
    };
    FadeInDirective = __decorate([
        core_1.Directive({
            inputs: ['fadeIn'],
            selector: '[fadeIn]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FadeInDirective);
    return FadeInDirective;
}());
exports.FadeInDirective = FadeInDirective;
//# sourceMappingURL=fade-in.js.map