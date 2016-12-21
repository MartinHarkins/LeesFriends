"use strict";
var core_1 = require("@angular/core");
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            template: "\n      <div class=\"container-fluid header margin-bottom-lg\">\n        <div class=\"row\">\n          <ul class=\"menu\">\n            <li class=\"margin-top-lg\"><a [routerLink]=\" './services' \"><h2>Services</h2></a></li>\n            <li class=\"margin-top-sm\"><a [routerLink]=\" './our-mission' \"><h2>Our Mission</h2></a></li>\n            <li class=\"margin-top-md\"><a [routerLink]=\" './history' \"><h2>History</h2></a></li>\n            <li>\n              <a [routerLink]=\" './home' \">\n                <h1 class=\"title\">\n                  Lee's Friends\n                </h1>\n              </a>\n            </li>\n            <li class=\"margin-top-md\"><a [routerLink]=\" './events' \"><h2>Events</h2></a></li>\n            <li class=\"margin-top-sm\"><a [routerLink]=\" './awards' \"><h2>Awards</h2></a></li>\n            <li class=\"margin-top-md\"><a [routerLink]=\" './about-us' \"><h2>About Us</h2></a></li>\n            <li class=\"margin-top-lg\"><a [routerLink]=\" './faq' \"><h2>FAQ</h2></a></li>\n          </ul>\n        </div>  \n        <div class=\"row\">\n            <div class=\"pull-right more\">\n                <a [routerLink]=\" './contact-us' \">Contact Us</a>\n            </div>\n        </div>\n      </div>\n    ",
            styleUrls: ['./header.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.js.map