var express = require('express');
var util = require('util');

var router = express.Router();

var EventsRouter = function(app, dataService) {
    /* GET events listing. */
    router.get('/', function (req, res, next) {
        console.log('get events');
        dataService.getEvents()
            .then(function onSuccess(docs) {
                res.json(docs);
            }, function onError(err) {
                console.error('Could not get list of events', err);

                res.status(500).send({error: 'Error getting list of events.'})
            });
    });

    router.post('/', function (req, res, next) {
        var newEvent = req.body.event || undefined;

        if (!newEvent) {
            res.status(400).send({error: 'Event was undefined.'});
            return;
        }

        dataService.addEvent(newEvent)
            .then(function(event) {
               res.json(event);
            }, function(err) {
                console.error('Error adding event to database', JSON.stringify(err));
                res.status(500).send({error: 'Error adding event to database.'});
            });
    });

    router.put('/:eventId', function(req, res, next) {
        var event = req.body.event || undefined;
        var id = req.params.eventId;

        if (!event) {
            res.status(400).send({error: 'Event was undefined.'});
            return;
        }

        dataService.updateEvent(id, event)
            .then(function(event) {
                res.json(event);
            }, function(err) {
                console.error('Error updating event in dataservice', JSON.stringify(err));
                res.status(500).send({error: 'Unknown error updating event'});
            });

    });

    return router;
};
module.exports = EventsRouter;
