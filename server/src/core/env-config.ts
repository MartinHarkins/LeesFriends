import fs = require('fs');

export class EnvConfig {
    public bCryptSalt: string;
    public defaultAdminAccount: {username: string, password: string};

    constructor() {
        const config = JSON.parse(fs.readFileSync('dist/config/config.json', 'utf8'));

        this.bCryptSalt = config.BCRYPT_SALT;
        this.defaultAdminAccount = config.defaultAdminAccount;
    }
}