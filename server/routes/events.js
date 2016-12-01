var express = require('express');
var router = express.Router();

var events = {
  data: [
    {
      name: "first event"
    }
  ]
};

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.json(events);
});

module.exports = router;
