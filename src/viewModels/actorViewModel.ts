/// <reference path="../_all.d.ts" />
"use strict";

import {IActor} from "../models/actor";

export class ActorViewModel {
    
    public homepage: string;
    public name: string;
    
    /**
     * Creates an instance of AccountViewModel.
     * 
     * @param {IAccount} domain
     * 
     * @memberOf AccountViewModel
     */
    public constructor(actor: IActor) {
        this.homepage = account.homepage;
        this.name = account.name;
    }
}