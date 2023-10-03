import React from 'react';
import Collection from './Collection.tsx';
import Diagram from './Diagram.tsx';
import References from './References.tsx';
import Tags from './Tags.tsx';
import { compareObjects } from './util.tsx';
import { tabFields, columnContent, unmodifiedColumns, TabName, Collection as CollectionJSON } from "./assets.tsx";
import type {Column as TableColumn} from 'react-table'


// spellchecker:words irredundant decentralized
function boolString(value: number | null): string {
    if (value === null) return "";
    else if (value > 0) return "yes";
    else return "no";
}

export type State = {
    columns: TabName,
    tbColumns: Array<TableColumn<any>>
    tbData: Array<any>
}

export default function newState(columns: TabName, data: CollectionJSON[]): State {
    const columnProps: Record<string, {
        Cell: (props: any) => any
        sortMethod?: (a: any, b: any) => number
    }> = {
        citable: {
            Cell: props => { boolString(props.value) }
        },
        irredundant: {
            Cell: props => { boolString(props.value) }
        },
        name: {
            Cell: props => <Collection show={columns === "general"} text={props.value.text} url={props.value.url} authors={props.value.authors} />,
            sortMethod: (a, b) => compareObjects(a, b, (o) => o.text.toLowerCase())
        },
        number_of_objects: {
            Cell: props => {
                if (props.value === null) return null;
                else return <span>{props.value}</span>
            }
        },
        references: {
            Cell: props => <References value={props.value} />
        },
        tags: {
            Cell: props => <Tags value={props.value} />
        },
        findable: {
            Cell: props => <Diagram type="F" value={props.value.value} id={props.value.id} />
        },
        accessible: {
            Cell: props => <Diagram type="A" value={props.value.value} id={props.value.id} />
        },
        interoperable: {
            Cell: props => <Diagram type="I" value={props.value.value} id={props.value.id} />
        },
        reusable: {
            Cell: props => <Diagram type="R" value={props.value.value} id={props.value.id} />
        }
    }

    return {
        columns: columns,
        tbColumns: (tabFields[columns]).map((field) => {
            // get the basic table column from the column content
            const column: TableColumn<any> | undefined = columnContent[field];
            if (typeof column === 'undefined') {
                console.warn('unknown field: ' + field)
            }

            // add the accessor (or a fallback)
            const cols = Object.assign({'accessor': field}, column ?? {'Header': field});

            // and also add additional column properties if needed
            if (!columnProps.hasOwnProperty(field)) {
                return cols;
            }
            return Object.assign(cols, columnProps[field]);
        }),
        tbData: data.map((c, i) => {
            // setup a bunch of columns manually
            const o = {
                index: i + 1,
                id: c.id,
                name: { text: c.name, url: c.url, authors: c.authors },
                findable: { id: c.id, value: c.findable },
                accessible: { id: c.id, value: c.accessible },
                interoperable: { id: c.id, value: c.interoperable },
                reusable: { id: c.id, value: c.reusable },
                references: { id: c.id, references: c.references },
                tags: c.tags
            };

            // and copy over unmodified columns too
            const unmodified = Object.fromEntries(unmodifiedColumns.map(e => [e, c[e]]))
            return Object.assign(o, unmodified);
        })
    };
}