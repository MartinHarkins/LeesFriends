"use strict";
var express = require('express');
var EventsRouter = (function () {
    function EventsRouter() {
    }
    EventsRouter.create = function (dataService) {
        var router = express.Router();
        console.log("Setting up event routes.");
        /**
         * GET events listing.
         */
        router.get('/', function (req, res, next) {
            var options = {
                includeDrafts: false
            };
            if (req.query.includeDrafts == 'true') {
                options.includeDrafts = true;
            }
            dataService.getEvents(options)
                .subscribe(function (events) { return res.json(events); }, function (err) {
                console.error('Could not get list of events', err);
                res.status(500).send({ error: 'Error getting list of events.' });
            });
        });
        router.post('/', function (req, res, next) {
            var newEvent = req.body.event || undefined;
            if (!newEvent) {
                res.status(400).send({ error: 'Event was undefined.' });
                return;
            }
            dataService.addEvent(newEvent)
                .subscribe(function (event) { return res.json(event); }, function (err) {
                console.error('Error adding event to database', JSON.stringify(err));
                res.status(500).send({ error: 'Error adding event to database.' });
            });
        });
        router.put('/:eventId', function (req, res, next) {
            var event = req.body || undefined;
            var id = req.params.eventId;
            if (!event) {
                res.status(400).send({ error: 'Event was undefined.' });
                return;
            }
            console.log('put id' + id);
            console.log('put event', event);
            dataService.updateEvent(id, event)
                .subscribe(function (event) { return res.json(event); }, function (err) {
                console.error('Error updating event in dataservice', JSON.stringify(err));
                res.status(500).send({ error: 'Unknown error updating event' });
            });
        });
        return router;
    };
    return EventsRouter;
}());
exports.EventsRouter = EventsRouter;
