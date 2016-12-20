import * as express from 'express';

import {NextFunction, Request, Response, Router} from "express";

import {DataService} from "../services/data-service";
import {Event} from "../models/event";

export class AuthRouter {
    private constructor() {
    }

    public static create(dataService: DataService): Router {
        const router = express.Router();

        console.log("Setting up auth routes.");

        router.post('/', (req: Request, res: Response, next: NextFunction) => {
            const username = req.body.username || undefined;
            const password = req.body.password || undefined;

            if (!username || !password) {
                res.status(400).send({error: 'Missing credentials.'});
                return;
            }

            dataService.isValidCredentials(username, password)
                .subscribe(responseWrapper => {
                        if (responseWrapper.isSuccessful()) {
                            res.status(200).json({
                                username: responseWrapper.response.username
                            });
                        } else {
                            console.log('Error getting user info', responseWrapper.error);
                            res.status(404).json({error: 'Invalid login/password'});
                        }
                    },
                    err => {
                        console.log('Error logging in', JSON.stringify(err));
                        res.status(500).send({error: 'Error logging in.'});
                    });
        });

        return router;
    }
}