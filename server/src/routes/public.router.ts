import * as express from "express";
import {NextFunction, Request, Response, Router} from "express";
import {DataService} from "../services/data-service";
import {Event} from "../models/event";
import {ResponseWrapper} from "../core/response-wrapper";

export class PublicRouter {
    private constructor() {
    }

    public static create(dataService: DataService): Router {
        const router = express.Router();

        console.log("Setting up public routes.");

        /**
         * GET events listing.
         */
        router.get('/events', (req: Request, res: Response, next: NextFunction) => {
            console.log("getting events...");

            dataService.getEvents()
                .subscribe((responseWrapper: ResponseWrapper<Event[]>) => {
                        if (responseWrapper.isSuccessful()) {
                            res.status(200).json(responseWrapper.response);
                        } else {
                            res.status(404).json({error: 'Error getting the list of events'});
                        }
                    },
                    err => {
                        console.error('Could not get list of events', err);

                        res.status(500).send({error: 'Error getting list of events.'})
                    });
        });

        return router;
    }
}