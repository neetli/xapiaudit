/// <reference path="../_all.d.ts" />
import {Request} from "express";

export class WebHelper {
    /**
     * Gets the specified parameter from the body as a string
     * @param req The Request that contains the parameter
     * @param name The name of the parameter whos value should be returned
     */
    public static getParameterString(req: Request, name: string): string {
        
        if (name in req.params) {
            return req.params[name].toString();
        }
        if (name in req.query) {
            return req.query[name].toString();
        }
        if (name in req.body) {
            return req.body[name].toString();
        } 

        return null;
    }

    /**
     * Gets the specified parameter from the body as a string
     * @param req The Request that contains the parameter
     * @param name The name of the parameter whos value should be returned
     */
    public static getParameterInt(req: Request, name: string): number {
        
        if (name in req.params) {
            let val = req.params[name].toString();
            if (!isNaN(val)) {
                return parseInt(val);
            }
        }

        if (name in req.query) {
            let val = req.query[name].toString();
            if (!isNaN(val)) {
                return parseInt(val);
            }
        }

        if (name in req.body) {
            let val = req.body[name].toString();
            if (!isNaN(val)) {
                return parseInt(val);
            }
        } 

        return -1;
    }
}
