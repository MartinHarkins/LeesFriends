import * as express from 'express';

import {NextFunction, Request, Response, Router} from "express";

import {DataService} from "../services/data-service";
import {Event} from "../models/event";
import {ResponseWrapper} from "../core/response-wrapper";

export class EventsRouter {
    private constructor() {
    }

    public static create(dataService: DataService): Router {
        const router = express.Router();

        console.log("Setting up event routes.");

        /**
         * GET events listing.
         */
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            let options = {
                includeDrafts: false
            };

            if (req.query.includeDrafts == 'true') {
                options.includeDrafts = true
            }
            dataService.getEvents(options)
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

        router.post('/', (req: Request, res: Response, next: NextFunction) => {
            const newEvent = req.body.event || undefined;

            if (!newEvent) {
                res.status(400).send({error: 'Event was undefined.'});
                return;
            }

            dataService.addEvent(newEvent)
                .subscribe((responseWrapper: ResponseWrapper<Event>) => {
                        if (responseWrapper.isSuccessful()) {
                            res.status(200).json(responseWrapper.response);
                        } else {
                            res.status(404).json({error: 'Error adding the event'});
                        }
                    },
                    err => {
                        console.error('Error adding event to database', JSON.stringify(err));
                        res.status(500).send({error: 'Error adding event to database.'});
                    }
                );
        });

        router.put('/:eventId', (req: Request, res: Response, next: NextFunction) => {
            const event = req.body || undefined;
            const id = req.params.eventId;

            if (!event) {
                res.status(400).send({error: 'Event was undefined.'});
                return;
            }

            console.log('put id' + id);
            console.log('put event', event);

            dataService.updateEvent(id, event)
                .subscribe((responseWrapper: ResponseWrapper<Event>) => {
                        if (responseWrapper.isSuccessful()) {
                            res.status(200).json(responseWrapper.response);
                        } else {
                            res.status(404).json({error: 'Error updating the event'});
                        }
                    },
                    (err) => {
                        console.error('Error updating event in dataservice', JSON.stringify(err));
                        res.status(500).send({error: 'Unknown error updating event'});
                    });
        });

        return router;
    }
}