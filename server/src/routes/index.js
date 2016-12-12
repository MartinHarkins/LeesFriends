"use strict";
/**
 * Created by mharkins on 12/10/16.
 */
var express = require('express');
var IndexRouter = (function () {
    function IndexRouter() {
    }
    IndexRouter.create = function () {
        var router = express.Router();
        router.get('/', function (req, res, next) {
            console.log('In index');
            res.render('index', { title: 'Express' });
        });
        return router;
    };
    return IndexRouter;
}());
exports.IndexRouter = IndexRouter;
