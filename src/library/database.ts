/// <reference path="../_all.d.ts" />
"use strict";

import * as mongoose from "mongoose";
import * as config from "config";

class Database {
    db: any;

    /**
     * Opens the mongodb connection or returns a refeerence
     * to the opened connection if it already exists 
     * 
     * @param {(err?) => void} next
     */
    public open(next: (err?: Error, connection?: mongoose.Connection) => void) {
        // check to see if init has already been called
        if (this.db) {
            return next(null, this.db);
        }

        // 9/3/2016 - update the mongoose promise library...addresses deprication warning
        mongoose.Promise = global.Promise;

        // load the mongodb config
        let dbConfig = <any>config.get("MongoDB");

        // check to turn on debugging
        if (dbConfig.enableDebug) {
            mongoose.set("debug", function (collectionName: any, method: any, query: any, doc: any) {
                console.log(query);
            });
        }
    
        // connect to mongodb    
        mongoose.connect(dbConfig.uri, null, (err) => {
            if (err) { return next(err); }

            // save a reference to the connection
            this.db = mongoose.connection;

            return next(null, this.db);
        });
    }


    /**
     * Closes the MongoDB connection 
     */
    public close() {
        if (this.db) {
            if (this.db.readyState === 1) {
                this.db.close();
            }
        }
    }
}

const db = new Database();
export {db as Database}