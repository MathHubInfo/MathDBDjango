import React from 'react';
import { Badge } from 'reactstrap';
import { compareObjects } from './util.js';

function Tag(props) {
    var style = "light";
    if (props.type === "MO") style = "info";
    return <Badge color={style} pill>{props.label}</Badge>
}

export default function Tags(props) {
    const tagArray = props.value;
    tagArray.sort((a, b) => compareObjects(a, b, (o) => o.name));
    const tags = tagArray.map((t, i) => <Tag key={i} label={t.name} type={t.type} />)
    return <React.Fragment>{tags}</React.Fragment>
}