import React from 'react';
import Collection from './Collection.js';
import Diagram from './Diagram.js';
import References from './References.js';
import Tags from './Tags.js';
import cols from './columns.json';

const boolString = (value) => {
    if (value === null) return "";
    else if (value > 0) return "yes";
    else return "no";
}

const copy = (from, to, fields) => {
    for (var j = 0; j < fields.length; j++) {
         var key = fields[j];
        to[key] = from[key];
    }
}

const unmodifiedFields = [
    "comment",
    "number_of_objects", "number_of_datasets", "number_of_contributors", "size", "time_to_generate",
    "provenance", "complete", "irredundant", "collaborative",  "decentralised", "searchable", "selfexplaining",
    "FAIR_summary"
]

export default function newState(columns, data) {
    
    const columnProps = {
        citable: {
            Cell: props => {boolString(props.value)}
        },
        irredundant: {
            Cell: props => {boolString(props.value)}
        },
        name: {
            Cell: props => <Collection show={columns === "general"} text={props.value.text} url={props.value.url} authors={props.value.authors} />
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
    
    var result = { columns: columns, tbColumns: [], tbData: [] }
    
    result.tbColumns = cols[columns].map((key) => {
        var col = cols["data"][key];
        if (typeof col === "undefined") console.log(key);
        col["accessor"] = key;
        if (columnProps.hasOwnProperty(key)) {
            for (var p in columnProps[key]) {
                if (columnProps[key].hasOwnProperty(p)) col[p] = columnProps[key][p];
            }
        }
        return col;
    });
       
    result.tbData = data.map((c, i) => {
        var o = {
            index: i + 1,
            id: c.id,
            name: {text: c.name, url: c.url, authors: c.authors},
            findable: {id: c.id, value: c.findable},
            accessible: {id: c.id, value: c.accessible},
            interoperable: {id: c.id, value: c.interoperable},
            reusable: {id: c.id, value: c.reusable},
            references: { id: c.id, references: c.references},
            tags: c.tags
        };
        copy(c, o, unmodifiedFields);
        console.log(o);
        return o;
    })
    
    return result;    
}