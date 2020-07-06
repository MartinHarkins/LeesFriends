"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurMissionComponent = void 0;
var core_1 = require("@angular/core");
var OurMissionComponent = /** @class */ (function () {
    function OurMissionComponent() {
    }
    OurMissionComponent = __decorate([
        core_1.Component({
            selector: 'our-mission',
            styleUrls: ['../../gunny-styles.scss', 'our-mission.scss'],
            template: "\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"image-container\">\n      <img\n        class=\"animate-show\" [fadeIn]\n        src=\"assets/images/leepic_border_fuzzy2.jpg\" alt=\"Lee Harkins\"\n        title=\"Lee's Portrait\"/>\n    </div>\n  </div>\n\n  <div class=\"row margin-top-lg\">\n    <div class=\"font-size-md primary-mission\">\n      <b>Our Primary Mission:</b><br/>\n      To offer person to person help and needed emotional and practical support to cancer\n      patients and their families who are facing the crisis of diagnosis and treatment of cancer.\n    </div>\n  </div>\n</div>\n"
        })
    ], OurMissionComponent);
    return OurMissionComponent;
}());
exports.OurMissionComponent = OurMissionComponent;
//# sourceMappingURL=our-mission.js.map