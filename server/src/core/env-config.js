"use strict";
var fs = require('fs');
var EnvConfig = (function () {
    function EnvConfig() {
        var config = JSON.parse(fs.readFileSync('dist/config/config.json', 'utf8'));
        this.bCryptSalt = config.BCRYPT_SALT;
        this.defaultAdminAccount = config.defaultAdminAccount;
    }
    return EnvConfig;
}());
exports.EnvConfig = EnvConfig;
