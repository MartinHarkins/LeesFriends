"use strict";
const express = require('express');
class EventsRouter {
    constructor() {
    }
    static create(dataService) {
        const router = express.Router();
        console.log("Setting up routes.");
        router.get('/', (req, res, next) => {
            console.log("howdy");
            dataService.getEvents()
                .subscribe((events) => res.json(events), err => {
                console.error('Could not get list of events', err);
                res.status(500).send({ error: 'Error getting list of events.' });
            });
        });
        router.post('/', (req, res, next) => {
            const newEvent = req.body.event || undefined;
            if (!newEvent) {
                res.status(400).send({ error: 'Event was undefined.' });
                return;
            }
            dataService.addEvent(newEvent)
                .subscribe(event => res.json(event), err => {
                console.error('Error adding event to database', JSON.stringify(err));
                res.status(500).send({ error: 'Error adding event to database.' });
            });
        });
        router.put('/:eventId', (req, res, next) => {
            const event = req.body || undefined;
            const id = req.params.eventId;
            if (!event) {
                res.status(400).send({ error: 'Event was undefined.' });
                return;
            }
            console.log('put id' + id);
            console.log('put event', event);
            dataService.updateEvent(id, event)
                .subscribe(event => res.json(event), (err) => {
                console.error('Error updating event in dataservice', JSON.stringify(err));
                res.status(500).send({ error: 'Unknown error updating event' });
            });
        });
        return router;
    }
}
exports.EventsRouter = EventsRouter;
