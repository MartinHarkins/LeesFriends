var express = require('express');
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

module.exports = router;
