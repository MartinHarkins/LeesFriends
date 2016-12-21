import * as express from 'express';

import * as path from 'path';
import * as bodyParser from 'body-parser';

import * as logger from 'morgan';

import * as cookieParser from 'cookie-parser';

import * as cors from 'cors';
import * as helmet from 'helmet';

import * as favicon from 'serve-favicon';

import {EventsRouter} from "./routes/events.router";
import {DataService} from "./services/data-service";
import {HttpError} from "./common/http-error";
import {IndexRouter} from "./routes/index";
import {EnvConfig} from "./core/env-config";
import {AuthRouter} from "./routes/auth.router";
import {PublicRouter} from "./routes/public.router";
import {JwtService} from "./core/jwt.service";


/**
 * The server.
 *
 * @class Server
 */
export class Server {

    private app: express.Application;
    private envConfig: EnvConfig;
    private jwtService: JwtService;
    private dataService: DataService;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this this.app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        this.envConfig = new EnvConfig();

        this.jwtService = new JwtService(this.envConfig);

        this.dataService = new DataService(this.app, this.envConfig);

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();

        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(new HttpError(404, 'Not Found'));
        });

        // error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.send({error: 'Unkown error'});
        });

    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        // Don't do anything there but it's needed to provide routing to the next api point.
        this.app.use('/api/', IndexRouter.create());

        this.app.use('/api/public', PublicRouter.create(this.dataService));

        this.app.use('/api/authenticate', AuthRouter.create(this.jwtService, this.dataService));
        this.app.use('/api/events', EventsRouter.create(this.jwtService, this.dataService));
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        this.app.use(helmet());

        this.app.use(cors());

        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));


        // uncomment after placing your favicon in /public
        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
    }
}
