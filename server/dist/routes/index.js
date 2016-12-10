"use strict";
const express = require('express');
class IndexRouter {
    constructor() {
    }
    static create() {
        const router = express.Router();
        router.get('/', (req, res, next) => {
            console.log('In index');
            res.render('index', { title: 'Express' });
        });
        return router;
    }
}
exports.IndexRouter = IndexRouter;
