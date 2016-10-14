/// <reference path="../_all.d.ts" />
"use strict";

import {MongoQueryBuilder} from "./mongoQueryBuilder";

export enum OperatorType {
    Equal,
    NotEqual,
    GreaterThan,
    GreatherThanEqual,
    LessThan,
    LessThanEqual
}

export enum FilterType {
    And,
    Or
}

/**
 * Represents a collection of filters and child filter collections. This class
 * is used to generically describe filter critiera in the Fiatoe system
 * 
 * @export
 * @class FilterCollection
 */
export class FilterSet {
    private _filterType: FilterType;
    private _filters: Filter[];
    private _childFilterSets: FilterSet[];

    /**
     * Creates an instance of FilterCollection.
     * 
     * @memberOf FilterCollection
     */
    public constructor() {
        this._filterType = FilterType.And;
        this._filters = [];
        this._childFilterSets = [];
    }

    /**
     * Type of filter describing how both child filters and filter collections
     * should be handled.
     * 
     * @type {FilterType}
     * @memberOf FilterCollection
     */
    get filterType(): FilterType {
        return this._filterType;
    }
    set filterType(value: FilterType) {
        this._filterType = value;
    }

    /**
     * Array of filters that belong to the FilterCollection
     * 
     * @readonly
     * @type {Filter[]}
     * @memberOf FilterCollection
     */
    get filters(): Filter[] {
        return this._filters;
    }

    /**
     * Array of child FilterSet that belongs to the FilterSet
     * 
     * @readonly
     * @type {FilterCollection[]}
     * @memberOf FilterCollection
     */
    get childFilterSets(): FilterSet[] {
        return this._childFilterSets;
    }

    /**
     * Adds a new filter to the set
     * 
     * @param {string} name The name of the field.
     * @param {OperatorType} operator The comparison / operator type.
     * @param {*} value The value to be compared.
     * 
     * @memberOf FilterCollection
     */
    public addFilter(name: string, operator: OperatorType, value: any): FilterSet {
        let filter = new Filter(name, operator, value);
        this._filters.push(filter);

        return this;
    }

    /**
     * Adds the supplied FilterItem to the filters collection
     * 
     * @param {Filter} filter The Filter to add to the collection.
     * 
     * @memberOf FilterSet
     */
    public addFilterItem(filter: Filter) {
        this.filters.push(filter);
    }

    /**
     * Adds a child filter set to this FilterSet
     * 
     * @param {FilterSet} filterSet The filter set to add.
     * @returns {FilterSet}
     * 
     * @memberOf FilterSet
     */
    public addChildFilterSet(filterSet: FilterSet): FilterSet {
        this._childFilterSets.push(filterSet);

        return this;
    }

    /**
     * Factory method for creating a FilterSet from a JSON object
     * 
     * @static
     * @param {*} jsonFilterSet
     * 
     * @memberOf FilterSet
     */
    public static fromJSON(jsonFilterSet: any): FilterSet {
        let filterSet = new FilterSet();
        filterSet.filterType = FilterType[<string>jsonFilterSet.filterType];

        // add the filters
        for (let fil of jsonFilterSet.filters) {
            let filter = Filter.fromJSON(fil);
            filterSet.addFilterItem(filter);
        }

        // add the child filter sets
        for (let set of jsonFilterSet.childFilterSets) {
            let childFilterSet = FilterSet.fromJSON(set);
            filterSet.addChildFilterSet(childFilterSet);
        }

        return filterSet;
    }

    /**
     * Returns a JSON representation of the FilterSet
     * 
     * @returns {*}
     * 
     * @memberOf FilterSet
     */
    public toJSON(): any {
        return { 
            filterType: FilterType[this.filterType],
            filters: this.filters,
            childFilterSets: this.childFilterSets
        };
    }

    /**
     * Returns the current state of the FilterSet as a MongoDb query object
     * 
     * @returns {*}
     * 
     * @memberOf FilterSet
     */
    public buildMongoQuery(): any {
        return MongoQueryBuilder.buildQuery(this);
    }
}

/**
 * This class represents and single filter comparison.
 * 
 * @export
 * @class Filter
 */
export class Filter {
    private _name: string;
    private _operatorType: OperatorType;
    private _value: any;

    /**
     * Creates an instance of Filter.
     * 
     * @param {string} name The name of the filter field
     * @param {OperatorType} operator The comparison / operator type
     * @param {*} value The value to be compared.
     * 
     * @memberOf Filter
     */
    public constructor(name: string, operator: OperatorType, value: any) {
        this._name = name;
        this._operatorType = operator;
        this._value = value; 
    }

    /**
     * The name of the filter field.
     * 
     * @type {string}
     * @memberOf Filter
     */
    get name(): string {
        return this._name; 
    }
    set name(value: string) {
        this._name = value;
    }

    /**
     * The comparison / operator type.
     * 
     * @type {OperatorType}
     * @memberOf Filter
     */
    get operator(): OperatorType {
        return this._operatorType; 
    }
    set operator(value: OperatorType) {
        this._operatorType = value;
    }

    /**
     * The filter value that will be compared.
     * 
     * @type {*}
     * @memberOf Filter
     */
    get value(): any {
        return this._value; 
    }
    set value(value: any) {
        this._value = value;
    }

    /**
     * Factory method for creating a filter from a json object
     * 
     * @param {any} jsonFilter
     * 
     * @memberOf Filter
     */
    public static fromJSON(jsonFilter: any) {
        return new Filter(jsonFilter.name,
            OperatorType[<string>jsonFilter.operator],
            jsonFilter.value);
    }

    /**
     * Returns the JSON representation of this object.
     * 
     * @returns {*} 
     * 
     * @memberOf Filter
     */
    public toJSON(): any {   
        return { 
            name: this.name,
            operator: OperatorType[this.operator],
            value: this.value
        };
    }
}