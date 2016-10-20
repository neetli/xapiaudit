/// <reference path="../_all.d.ts" />
"use strict";

import * as mongoose from "mongoose";

export interface IStatement extends mongoose.Document {
  name: string; 
  description: string; 
  oid: string;
};

export const sampleSchema = new mongoose.Schema({
    name: String,
    description: String,
    oid: String
});

const sample = mongoose.model<ISample>("Sample", sampleSchema);
export {sample as Sample}; 