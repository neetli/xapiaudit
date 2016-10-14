/// <reference path="../_all.d.ts" />
"use strict";

export class StringLib {

    public static startsWith(base: string, search: string): boolean {
        return base.slice(0, search.length) === search;
    }

    public static endsWith(base: string, search: string): boolean {
        return base.slice(-search.length) === search;
    }

    public static format(value: string, args: any[]): string {
        //let args = Array.prototype.slice.call(arguments, 1);
        return value.replace(/{(\d+)}/g, function(match: any, number: number) {
            return typeof args[number] !== "undefined" ? args[number] : match;
        });
    }

    public static isNullOrEmpty(value: any): boolean {
        if (value && (typeof value === "string" || value instanceof String)) {
            if (value.length > 0) {
                return false;
            }
        }

        return true;
    }
}
