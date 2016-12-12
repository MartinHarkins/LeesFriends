/**
 * Created by mharkins on 12/10/16.
 */
import * as express from 'express';

import {NextFunction, Request, Response, Router} from "express";

export class IndexRouter {
    private constructor() {
    }

    public static create(): Router {
        const router = express.Router();

        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            console.log('In index');
            res.render('index', {title: 'Express'});
        });

        return router;
    }
}