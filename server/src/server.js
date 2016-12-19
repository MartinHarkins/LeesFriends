"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var events_1 = require("./routes/events");
var data_service_1 = require("./services/data-service");
var http_error_1 = require("./common/http-error");
var index_1 = require("./routes/index");
var env_config_1 = require("./core/env-config");
var auth_1 = require("./routes/auth");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        this.envConfig = new env_config_1.EnvConfig();
        this.dataService = new data_service_1.DataService(this.app, this.envConfig);
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(new http_error_1.HttpError(404, 'Not Found'));
        });
        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.send({ error: 'Unkown error' });
        });
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this this.app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    Server.prototype.api = function () {
        // Don't do anything there but it's needed to provide routing to the next api point.
        this.app.use('/', index_1.IndexRouter.create());
        this.app.use('/events', events_1.EventsRouter.create(this.dataService));
        this.app.use('/auth', auth_1.AuthRouter.create(this.dataService));
    };
    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    Server.prototype.config = function () {
        this.app.use(helmet());
        this.app.use(cors());
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        // uncomment after placing your favicon in /public
        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    };
    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    Server.prototype.routes = function () {
    };
    return Server;
}());
exports.Server = Server;
