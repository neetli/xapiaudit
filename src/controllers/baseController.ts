/// <reference path="../_all.d.ts" />
"use strict";

import {Response} from "express";
import * as Exceptions from "../library/exceptions";

export class Controller {
    /**
     * Handles sending a consistent error response to 
     * any controller call. 
     * 
     * @param {Response} res Express Response
     * @param {Error} err
     */
    public static handleException(res: Response, err: Error): void {
        let httpError = <Exceptions.HttpError>err;

        let httpStatus = 500;
        if (httpError.number) {
            // use the http error codes in the exception
            httpStatus = httpError.number; 
        } 

        let message = "";
        if (httpError.message) {
            message = httpError.message;
        }

        // send the response
        res.status(httpStatus).send({
            number: httpStatus,
            message: message
        });
    }
}