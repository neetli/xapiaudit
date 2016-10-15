/// <reference path="../_all.d.ts" />
"use strict";

import {StringLib} from "../library/stringLib";
import * as e from "../library/exceptions";
import * as model from "../models/sample";
import * as uuid from "node-uuid";
import * as f from "../library/filtering";

/**
 * Application samples are the root container in the ORM service. They contain
 * one or more application definitions which then contain entities etc.
 * 
 * @export
 * @class SampleService
 */
export class SampleService {
    
    /**
     * Creates a new application sample
     * 
     * @param {string} name The name of the application
     * @param {string} description The description of the application
     * @param {(err:Error, application: applicationModel.IApplication)=>void} next
     */
    public create(name: string, description: string, 
        next: (err: Error, sample?: model.ISample) => void) {
        
        // validate the data
        if (StringLib.isNullOrEmpty(name)) {
            return next(new e.ValidationError("\"name\" is missing and is required."));
        }

        // build the query
        let fs = new f.FilterSet()
            .addFilter("name", f.OperatorType.Equal, name);

        // samples must be unique...
        this.findOne(fs, (err, sample) => {
            if (err) { return next(err); }

            if (sample) {
                // found a matching sample...stop here
                return next(new e.ValidationError("Sample \"name\" is already in use."));
            }

            let newSample = new model.Sample(); 
            newSample.name = name;
            newSample.description = description;
            newSample.oid = uuid.v4();
            newSample.save((err: any, savedSample: any) => {
                if (err) { return next(err); }

                return next(null, savedSample);
            });
        });
    }

    /**
     * Removes an Sample from the system by oid
     * 
     * @param {string} oid
     * @param {(err: Error) => void} next
     */
    public delete(oid: string, next: (err?: Error) => void) {
        // validate params
        if (StringLib.isNullOrEmpty(oid)) {
            return next(new e.ValidationError("\"oid\" is missing and is required."));
        }

        // find the sample by oid
        let fs = new f.FilterSet()
            .addFilter("oid", f.OperatorType.Equal, oid);
        this.findOne(fs, (err, sample) => {
            if (err) { return next(err); }
            
            if (!sample) {
                return next(new e.NotFoundError("Sample specified by \"oid\" is cannot be found."));
            }

            this.deleteSample(sample, next);
        });
    }

    /**
     * Deletes the specified Sample. This method can be used
     * to clean up any related data, then delete this Sample
     * 
     * @private
     * @param {SampleModel.ISample} sample
     * @param {(err?: Error) => void} next
     */
    private deleteSample(sample: model.ISample, next: (err?: Error) => void) {
        
        // remove the sample now that it is empty
        sample.remove((err: Error) => {
            if (err) { return next(err); }

            return next();
        });
    }

    /**
     * Finds a Sample by name 
     * 
     * @param {string} oid The oid of the sample
     * @param {(err: Error, sample: model.ISample) => void} next The callback method
     */
    public get(oid: string, next: (err: Error, sample?: model.ISample) => void) {
        // validate params
        if (StringLib.isNullOrEmpty(oid)) {
            return next(new e.ValidationError("\"oid\" is missing and is required."));
        }

        let fs = new f.FilterSet()
            .addFilter("oid", f.OperatorType.Equal, oid);
        
        this.findOne(fs, (err, sample) => {
            if (err) { return next(err); }

            return next(null, sample);
        });
    }

    /**
     * Returns a list of samples based on the supplied filter criteria
     * 
     * @param {f.FilterSet} filterSet The oid of the sample to search
     * @param {(err: Error, samples: [model.ISample]) => void} next
     * 
     * @memberOf SampleService
     */
    public find(filterSet: f.FilterSet, 
        next: (err: Error, samples?: [model.ISample]) => void) {

        let query = filterSet ? filterSet.buildMongoQuery() : {};

        model.Sample.find(query, (err, res) => {
            if (err) { return next(err); }

            return next(null, <[model.ISample]>res);
        });
    }

    /**
     * Returns a single application base on the supplied criteria
     * 
     * @param {string} sampleOid The oid of the sample
     * @param {f.FilterSet} filterSet The filter / search criteria
     * @param {(err: Error, application?: model.IApplication) => void} next
     * 
     * @memberOf SampleService
     */
    public findOne(filterSet: f.FilterSet, 
        next: (err: Error, application?: model.ISample) => void) {
        
        this.find(filterSet, (err, samples) => {
            if (err) { return next(err); }

            let sample = samples.length > 0 ? samples[0] : null;
            return next(null, sample);
        });
    }

    /**
     * Updates an application sample
     *
     * @param {string} oid The oid of the application 
     * @param {string} name The name of the application
     * @param {string} description The description of the application
     * @param {(err:Error, application: applicationModel.IApplication)=>void} next
     */
    public update(oid: string, name: string, description: string, 
        next: (err: Error, sample?: model.ISample) => void) {

        // validate the data
        if (StringLib.isNullOrEmpty(oid)) {
            return next(new e.ValidationError("\"oid\" is missing and is required."));
        }
        if (StringLib.isNullOrEmpty(name)) {
            return next(new e.ValidationError("\"name\" is missing and is required."));
        }

        // find the existing sample
        this.get(oid, (err, sample) => {
            if (err) { return next(err); }

            if (!sample) {
                return next(new e.NotFoundError("Sample specified by \"oid\" could not be found."));
            }
            
            // ensure the name is still unique
            let fs = new f.FilterSet()
                .addFilter("oid", f.OperatorType.NotEqual, oid)
                .addFilter("name", f.OperatorType.Equal, name);
            
            this.findOne(fs, (err, dupSample) => {
                if (err) { return next(err); }

                if (dupSample) {
                    // found a matching sample...stop here
                    return next(new e.ValidationError("Sample \"name\" is alread in use."));
                }

                // update the existing sample entry
                sample.name = name;
                sample.description = description;
                sample.save((err: any, updatedSample: any) => {
                    if (err) { return next(err, null); }

                    return next(null, updatedSample);
                });
            });
        });
    }
}