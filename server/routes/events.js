var express = require('express');
var util = require('util');
var router = express.Router();

var events = [{
        title: 'Title 1 up',
        content: 'Content 1 up',
        date: new Date()
    }, {
        title: 'Title 2 up',
        content: 'Content 2 up',
        date: new Date()
    }]
    ;

/* GET events listing. */
router.get('/', function (req, res, next) {
    res.json(events);
});

router.post('/', function(req, res, next) {
    console.log("posted event:" + req.body.event);
    var newEvent = req.body.event || undefined;

    events.push(newEvent);

    util.inspect('events', events);
    res.json(newEvent);
});

module.exports = router;
