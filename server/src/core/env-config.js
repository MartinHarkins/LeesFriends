"use strict";
var fs = require('fs');
var EnvConfig = (function () {
    function EnvConfig() {
        var config = JSON.parse(fs.readFileSync('dist/config/config.json', 'utf8'));
        this.keys = {
            bCryptSalt: config.keys.BCRYPT_SALT,
            jwtSecret: config.keys.JWT_SECRET
        };
        this.defaultAdminAccount = config.defaultAdminAccount;
    }
    return EnvConfig;
}());
exports.EnvConfig = EnvConfig;
