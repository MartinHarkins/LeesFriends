import fs = require('fs');

export class EnvConfig {
    public keys: {bCryptSalt: string, jwtSecret: string}
    public defaultAdminAccount: {username: string, password: string};

    constructor() {
        const config = JSON.parse(fs.readFileSync('dist/config/config.json', 'utf8'));

        this.keys = {
            bCryptSalt: config.keys.BCRYPT_SALT,
            jwtSecret: config.keys.JWT_SECRET
        };
        this.defaultAdminAccount = config.defaultAdminAccount;
    }
}