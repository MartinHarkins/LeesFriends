"use strict";
var express = require('express');
var AuthRouter = (function () {
    function AuthRouter() {
    }
    AuthRouter.create = function (dataService) {
        var router = express.Router();
        console.log("Setting up auth routes.");
        router.post('/login', function (req, res, next) {
            var username = req.body.username || undefined;
            var password = req.body.password || undefined;
            if (!username || !password) {
                res.status(400).send({ error: 'Missing credentials.' });
                return;
            }
            dataService.isValidCredentials(username, password)
                .subscribe(function (user) {
                res.status(200).json({
                    username: user.username
                });
            }, function (err) {
                console.log('Error logging in', JSON.stringify(err));
                res.status(500).send({ error: 'Error logging in.' });
            });
        });
        return router;
    };
    return AuthRouter;
}());
exports.AuthRouter = AuthRouter;
