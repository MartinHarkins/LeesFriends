"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const events_1 = require("./routes/events");
const data_service_1 = require("./services/data-service");
const http_error_1 = require("./common/http-error");
const index_1 = require("./routes/index");
class Server {
    constructor() {
        this.app = express();
        this.dataService = new data_service_1.DataService(this.app);
        this.config();
        this.routes();
        this.api();
        this.app.use(function (req, res, next) {
            next(new http_error_1.HttpError(404, 'Not Found'));
        });
        this.app.use((err, req, res, next) => {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.send({ error: 'Unkown error' });
        });
    }
    static bootstrap() {
        return new Server();
    }
    api() {
        this.app.use('/', index_1.IndexRouter.create());
        this.app.use('/events', events_1.EventsRouter.create(this.dataService));
    }
    config() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }
    routes() {
    }
}
exports.Server = Server;
