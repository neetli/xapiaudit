/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";
//import {AuthenticationController} from "../controllers/authenticationController";

export class RouteBuilder {
    public static configureRouter(): express.Router {
        let router = express.Router();

        /**********************************
         * API Routes
         **********************************/

        /* Authentication */
        //router.post("/users/authenticate", AuthenticationController.authenticate);
        // router.post('/api/authenticateGoogle', AuthenticationController.authenticateGoogle);

        /**********************************
        * Web Routes
        **********************************/
        router.get("/", function (req: express.Request, res: express.Response) {
            res.render("index", {});
        });

        return router;
    }
}