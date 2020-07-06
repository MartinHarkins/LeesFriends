"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            template: "\n      <div class=\"container-fluid header\">\n        <div class=\"row menu\">\n          <div class=\"menu-group menu-group-left\">\n            <div class=\"menu-item margin-top-lg\"><a [routerLink]=\" './services' \" routerLinkActive=\"active-link\"><h2>Services</h2></a></div>\n            <div class=\"menu-item margin-top-sm\"><a [routerLink]=\" './our-mission' \" routerLinkActive=\"active-link\"><h2>Our Mission</h2></a></div>\n            <div class=\"menu-item margin-top-md\"><a [routerLink]=\" './history' \" routerLinkActive=\"active-link\"><h2>History</h2></a></div>\n          </div>\n          <div class=\"menu-group menu-group-center\" >\n            <a [routerLink]=\" './home' \" routerLinkActive=\"active-link\">\n              <img class=\"title-image\" src=\"../../../../../client/src/assets/images/lees-friends-icon.png\" alt=\"\"/>\n              <h1 class=\"title\">\n                Lee's Friends\n              </h1>\n            </a>\n            <h3 class=\"subtitle\">Helping People Live With Cancer</h3>\n          </div>\n          <div class=\"menu-group menu-group-right\">\n            <div class=\"menu-item margin-top-md\"><a [routerLink]=\" './events' \" routerLinkActive=\"active-link\"><h2>Events</h2></a></div>\n            <div class=\"menu-item margin-top-sm\"><a [routerLink]=\" './awards' \" routerLinkActive=\"active-link\"><h2>Awards</h2></a></div>\n            <div class=\"menu-item margin-top-md\"><a [routerLink]=\" './about-us' \" routerLinkActive=\"active-link\"><h2>About Us</h2></a></div>\n            <div class=\"menu-item margin-top-lg\"><a [routerLink]=\" './faq' \" routerLinkActive=\"active-link\"><h2>FAQ</h2></a></div>\n          </div>\n        </div>  \n        <div class=\"row\">\n            <div class=\"pull-right more\">\n                <a [routerLink]=\" './contact-us' \" routerLinkActive=\"active-link\"><h5>Contact Us</h5></a>\n            </div>\n        </div>\n      </div>\n    ",
            styleUrls: ['./header.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.js.map
