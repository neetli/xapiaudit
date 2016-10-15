/// <reference path="../_all.d.ts" />
"use strict";

import {Request} from "express";
import {Response} from "express";
import {Controller} from "./baseController";
import {WebHelper} from "../library/webHelper";
import {SampleService} from "../services/sampleService";
import {SampleViewModel} from "../viewModels/sampleViewModel";
import * as f from "../library/filtering";

export class SampleController extends Controller {
    
    /**
     * Creates a new Sample
     * 
     * @param {Request} req The Express request object
     * @param {Response} res The Express response object
     */
    public static create(req: Request, res: Response) {
        // get the request params
        let name = WebHelper.getParameterString(req, "name");
        let description = WebHelper.getParameterString(req, "description");

        // create the new sample
        let svc = new SampleService();
        svc.create(name, description, (err, sample) => {
            if (err) {
                return SampleController.handleException(res, err);
            }

            // send the new domain object back to the user
            return res.status(200).send(new SampleViewModel(sample));
        });
    }

    /**
     * Deletes a Sample
     * 
     * @static
     * @param {Request} req The Express request object
     * @param {Response} res The Express response object
     */
    public static delete(req: Request, res: Response) {
        // get the request params
        let oid = WebHelper.getParameterString(req, "oid");

        // create the domain service and delete the sample
        let domainSvc = new SampleService();
        domainSvc.delete(oid, (err) => {
            if (err) {
                return SampleController.handleException(res, err);
            }

            // send the success status back to the user
            return res.status(200).send();
        });
    }

    /**
     * Gets a Sample based on it oid 
     * 
     * @static
     * @param {Request} req The Express request object
     * @param {Response} res The Express response object
     */
    public static get(req: Request, res: Response) {
        // get the request params
        let oid = WebHelper.getParameterString(req, "oid");

        // create the sample service and find the sample
        let svc = new SampleService();
        svc.get(oid, (err, sample) => {
            if (err) {
                return SampleController.handleException(res, err);
            }

            // send the new Sample object back to the user
            return res.status(200).send(new SampleViewModel(sample));
        });
    }

    /**
     * Gets all samples 
     * 
     * @static
     * @param {Request} req The Express request object
     * @param {Response} res The Express response object
     */
    public static find(req: Request, res: Response) {
        // get the request params
        let search = WebHelper.getParameterString(req, "search");

        // "search"" should be a json representation of a FilterSet
        let searchFilterSet: f.FilterSet;
        if (search) {
            searchFilterSet = f.FilterSet.fromJSON(search);
        } 

        // create the sample service and find the samples
        let svc = new SampleService();
        svc.find(searchFilterSet, (err, results) => {
            if (err) {
                return SampleController.handleException(res, err);
            }

            // send the samples back to the user
            let samples = [];
            for (let sample of results) {
                samples.push(new SampleViewModel(sample));
            }
            return res.status(200).send(samples);
        });
    }

    /**
     * Updates a Sample
     * 
     * @param {Request} req The Express request object
     * @param {Response} res The Express response object
     */
    public static update(req: Request, res: Response) {
        // get the request params
        let oid = WebHelper.getParameterString(req, "oid");
        let name = WebHelper.getParameterString(req, "name");
        let description = WebHelper.getParameterString(req, "description");

        // update the Sample
        let domainSvc = new SampleService();
        domainSvc.update(oid, name, description, (err, sample) => {
            if (err) {
                return SampleController.handleException(res, err);
            }

            // send the updated sample object back to the user
            return res.status(200).send(new SampleViewModel(sample));
        });
    }
} 