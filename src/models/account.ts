/// <reference path="../_all.d.ts" />
"use strict";

export interface IAccount 
{
    homepage: string;
    name: string;
}

export class Account implements IAccount
{
    homepage = "";
    name = "";
}