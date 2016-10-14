/// <reference path="../_all.d.ts" />
"use strict";

export interface IHttpError {
    number: number;
    message: string;
}

/**
 * This is the base HTTP error used in the system. All HTTP related errors
 * should derive this from class.
 * 
 * @extends {Error}
 * @implements {IHttpError}
 */
export class HttpError extends Error implements IHttpError {
    
    private _number: number;

    /**
     * Creates an instance of SecurityError.
     * 
     * @param {number} number The Http Error code
     * @param {string} message The error message that will be returned to the caller
     */
    public constructor(number: number, message: string) {
        super(message);
        this.number = number;
    }

    /**
     * Gets / Sets the Http Error nunber 
     * 
     * @type {number} Http Error number
     */
    public get number(): number {
        return this._number; 
    }
    public set number(value : number) {
        this._number = value;
    }
}

export class ValidationError extends HttpError {
    public constructor(message: string) {
        const errorNumber = 400;
        super(errorNumber, message);
    }    
}

export class SecurityError extends HttpError {
    public constructor(message: string) {
        const errorNumber = 401;
        super(errorNumber, message);
    }
}

export class ServerError extends HttpError {
    public constructor(message: string) {
        const errorNumber = 500;
        super(errorNumber, message);
    }
}

export class NotFoundError extends HttpError {
    public constructor(message: string) {
        const errorNumber = 404;
        super(errorNumber, message);
    }
}