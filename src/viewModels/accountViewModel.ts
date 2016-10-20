/// <reference path="../_all.d.ts" />
"use strict";

import {IAccount} from "../models/account";

export class AccountViewModel {
    
    public homepage: string;
    public name: string;
    
    /**
     * Creates an instance of AccountViewModel.
     * 
     * @param {IAccount} domain
     * 
     * @memberOf AccountViewModel
     */
    public constructor(account: IAccount) {
        this.homepage = account.homepage;
        this.name = account.name;
    }
}