/// <reference path="../_all.d.ts" />
"use strict";

import * as express from "express";
import {SampleController} from "../controllers/sampleController";

export class RouteBuilder {
    public static configureRouter(): express.Router {
        let router = express.Router();

        /**********************************
         * API Routes
         **********************************/

        /* Samples */
        router.get("/samples/:oid", SampleController.get);
        router.get("/samples", SampleController.find);
        router.post("/samples", SampleController.create);
        router.put("/samples", SampleController.update);
        router.delete("/samples", SampleController.delete);
        

        /**********************************
        * Web Routes
        **********************************/
        router.get("/", function (req: express.Request, res: express.Response) {
            res.render("index", {});
        });

        return router;
    }
}