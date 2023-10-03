/**
 * @file an API for type-safe columns and tabs
 */

// spellchecker:words irredundant decentralised

import colsJSON from './assets/columns.json'
import tabsJSON from './assets/tabs.json'

import type {Column as TableColumn} from 'react-table'

/**
 * A MathDBDjango collection returned by the API
 */
export interface Collection {
    id: number;
    name: string;
    description: null;
    url: string;
    authors: Author[];
    references: Reference[];
    tags: Tag[];
    comment: string;
    numberOfDatasets: number;
    numberOfObjects: number;
    numberOfContributors: null;
    sizeCompressed: null;
    sizeUncompressed: null;
    timeToGenerate: null;
    provenance: string;
    complete: string;
    irredundant: string;
    collaborative: string;
    searchable: string;
    selfExplaining: string;
    summaryOfFAIR: string;
    findable: string;
    accessible: string;
    interoperable: string;
    reusable: string;
}

export interface Author {
    id?: number;
    givenName: string;
    familyName: string;
    url: null | string;
}

export interface Reference {
    id?: number;
    type: string;
    value: string;
}

export interface Tag {
    name: string;
    type: null | string;
}


type Columns = keyof Omit<Collection, 'id' | 'description' | 'url' | 'authors' | 'sizeCompressed' | 'sizeUncompressed'>;
export const columnContent =  Object.freeze(colsJSON as Record<Columns, TableColumn<any>>) // TODO: stuff
export const unmodifiedColumns = [
    "comment",
    "numberOfObjects", "numberOfDatasets", "numberOfContributors", "timeToGenerate",
    "provenance", "complete", "irredundant", "collaborative", "searchable", "selfExplaining",
    "summaryOfFAIR"
] as const;

export type TabName = keyof typeof tabsJSON;
export const tabFields = Object.freeze(tabsJSON as Record<TabName, Columns[]>)