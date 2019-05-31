import React from 'react';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faTable } from '@fortawesome/free-solid-svg-icons'
import { compareObjects } from './util.js';

const typeOrder = (cat) => {
    if (cat === "category") return 1;
    if (cat === "MO") return 2;
    else return 3;
}

function Category(props) {
    var icon = faTable;
    if (props.label === "system") icon = faDatabase;
    return <Badge color="primary" pill><FontAwesomeIcon icon={icon} /></Badge>
}

function Tag(props) {
    var style = "light";
    if (props.type === "MO") style = "info";
    if (props.type === "category") return <Category label={props.label} />
    return <Badge color={style} pill>{props.label}</Badge>
}

export default function Tags(props) {
    const tagArray = props.value;
    tagArray.sort((a, b) => compareObjects(a, b, (o) => [typeOrder(o.type), o.name]));
    const tags = tagArray.map((t, i) => <Tag key={i} label={t.name} type={t.type} />)
    return <React.Fragment>{tags}</React.Fragment>
}