/// <reference path="../_all.d.ts" />
"use strict";

import {ISample} from "../models/sample";

export class SampleViewModel {
    
    public oid: string;
    public name: string; 
    public description: string; 
    
    /**
     * Creates an instance of SampleViewModel.
     * 
     * @param {ISample} domain
     * 
     * @memberOf SampleViewModel
     */
    public constructor(sample: ISample) {
        this.oid = sample.oid;
        this.name = sample.name;
        this.description = sample.description;
    }
}