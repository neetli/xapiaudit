/// <reference path="../_all.d.ts" />
"use strict";

import "mocha";
import {expect} from "chai";
import {SampleService} from "../services/sampleService";
import {Database} from "../library/database";
import * as async from "async";

describe("Sample Service", () => {
    let sampleData = {
        name: "Test Sample",
        desc: "This is a test description",
        oid: null
    };

    let sampleSvc = new SampleService();
    let sample = null;

    before((done) => {
        async.series([
            function(callback: any) {
                // open the database connection
                Database.open((err: any, connection: any) => {
                    if (err) { return callback(err); }

                    return callback();
                });
            },
            function(callback: any) {
                // remove the test Sample if it is present for some reason
                // it should have been cleaned up from the latest test
                sampleSvc.getByName(sampleData.name, (err, foundSample) => {
                    if (err) { return callback(err); }

                    if (foundSample) {
                        sampleSvc.delete(foundSample.oid, (err) => {
                            if (err) { return callback(err); }
                            
                            return callback();        
                        });
                    }
                    return callback();
                });
            }
        ],
        function(err: any, results: any) {
            if (err) { return done(err); }

            return done();
        });
    });

    after((done) => {
        // remove the test Sample
        if (sampleData.oid) {
            sampleSvc.delete(sampleData.oid, (err) => {
                done();
            });
        } else {
            done();
        }
    });

    describe("create()", () => {
        it("should be able to create a new Sample", (done) => {
            sampleSvc.create(sampleData.name, 
                sampleData.desc,
                (err: any, sample: any) => {
                    expect(err).to.not.be.ok;
                    expect(sample).to.be.ok;

                    sampleData.oid = sample.oid;

                    done();
            });
        });
    });

    describe("get()", () => {
        it("should be able to find a Sample", (done) => {
            sampleSvc.get(sampleData.oid, (err, foundDomain) => {
                expect(err).to.not.be.ok;
                expect(foundDomain).to.be.ok;

                done();
            });
        });
    });

    describe("update()", () => {
        it("should be able to update a Sample", (done) => {
            sampleSvc.update(sampleData.oid, "Updated_Name", "Updated Description...", (err, updatedSample) => {
                expect(err).to.not.be.ok;
                expect(updatedSample).to.be.ok;
                expect(updatedSample.name).to.equal("Updated_Name");
                expect(updatedSample.description).to.equal("Updated Description...");
                done();
            });
        });
    });

    describe("delete()", () => {
        it("should be able to delete a Sample", (done) => {
            sampleSvc.delete(sampleData.oid, (err) => {
                expect(err).to.not.be.ok;

                // try to find the sample and make sure its gone
                sampleSvc.get(sampleData.oid, (err, deletedSample) => {
                    expect(err).to.not.be.ok;
                    expect(deletedSample).to.not.be.ok;

                    done();
                });
            });
        });
    });
});
