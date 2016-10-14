 /// <reference path="../_all.d.ts" />
"use strict";

import * as f from "./filtering";
import * as m from "mongodb";

export class MongoQueryBuilder {
    
    /**
     * Builds a mongodb filter object
     * 
     * @param {f.FilterSet} filterSet The filter set to process.
     * @returns {*} Object that describes the filter structure
     * 
     * @memberOf MongoQueryBuilder
     */ 
    public static buildQuery(filterSet: f.FilterSet): any {
        let mongoFilter: any = {};
        let filterArray: [any] = null;

        if (filterSet.filterType === f.FilterType.And) {
            mongoFilter["$and"] = [];
            filterArray = mongoFilter["$and"];
        } else if (filterSet.filterType === f.FilterType.Or) {
            mongoFilter["$or"] = [];
            filterArray = mongoFilter["$or"];
        }

        for (let fil of filterSet.filters) {
            let processedFilter = MongoQueryBuilder.processFilter(fil);
            filterArray.push(processedFilter);
        }

        for (let childFilterSet of filterSet.childFilterSets) {
            let childFilterStatement =  MongoQueryBuilder.buildQuery(childFilterSet);
            filterArray.push(childFilterStatement);
        }

        return mongoFilter;
    }

    /**
     * Processes the specified filter adding it to the filter object
     * 
     * @private
     * @param {f.Filter} filter
     * 
     * @memberOf MongoQueryBuilder
     */
    private static processFilter(fil: f.Filter) {
        let filterStatement: any = {};

        // get the mongo db comparison operator
        let opStmt = MongoQueryBuilder.getOperatorStatement(fil.operator);
        
        filterStatement[fil.name] = {};

        filterStatement[fil.name][opStmt] = fil.value;

        return filterStatement;
    } 

    /**
     * Gets the operator that will be used in the filter staetment
     * 
     * @private
     * @param {f.OperatorType} operator The comparison operator.
     * 
     * @memberOf MongoQueryBuilder
     */
    private static getOperatorStatement(operator: f.OperatorType) {
        let operatorStatement = "";

        switch (operator) {
            case f.OperatorType.Equal :
                operatorStatement = "$eq"; 
                break;

            case f.OperatorType.GreaterThan :
                operatorStatement = "$gt";
                break;

            case f.OperatorType.GreatherThanEqual :
                operatorStatement = "$gte";
                break;

            case f.OperatorType.LessThan :
                operatorStatement = "$lt";
                break;

            case f.OperatorType.LessThanEqual :
                operatorStatement = "$lte";
                break;

            case f.OperatorType.NotEqual :
                operatorStatement = "$ne";
                break;
        }

        return operatorStatement;
    }
}