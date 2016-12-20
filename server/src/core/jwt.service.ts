import {EnvConfig} from "./env-config";
import * as jwt from 'jsonwebtoken';

import {NextFunction, Request, Response, Router} from "express";
import {User} from "../models/user";

interface JwtRequest extends Request {
    decoded: string;
}

export class JwtService {
    constructor(private envConfig: EnvConfig) {

    }

    /**
     * Generate a new token from a user object.
     */
    public newToken(user: User): string {
        // if user is found and password is right
        // create a token
        return jwt.sign(user, this.getSecret(), {
            expiresIn: 24 * 60 * 60 * 1000 // expires in 24 hours
        });
    }

    /**
     * Add authentication check on the router
     */
    public guard(router: Router): void {
        router.use((req: JwtRequest, res: Response, next: NextFunction) => {
            // check header or url parameters or post parameters for token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, this.getSecret(), (err, decoded) => {
                    if (err) {
                        return res.status(401).send({error: 'Invalid Token'});
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    error: 'No token provided.'
                });
            }
        });

    }

    private getSecret(): string {
        console.log('this.envConfig.keys.jwtSecret:' + this.envConfig.keys.jwtSecret);
        return this.envConfig.keys.jwtSecret;
    }
}