/// <reference path="_all.d.ts" />

"use strict";

import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as mysql from "mysql";
//import * as db from "./services/databaseService";
import {RouteBuilder} from "./routes/routeBuilder";


/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
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
        // create express application
        this.app = express();

        // configure application
        this.config();
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private config() {
        // view engine setup
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "ejs");

        //app.use(logger('dev'));
        
        // wire up the request parsing 
        // uncomment after placing your favicon in /public
        //app.use(favicon(__dirname + '/public/favicon.ico'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));

        // router setup
        let router = RouteBuilder.configureRouter();
        this.app.use(router);

        // connect to the database
        // db.DatabaseService.connect();
    }
}