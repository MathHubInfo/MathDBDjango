import React, { Component } from 'react';
import { Badge } from 'reactstrap';

function Tag(props) {
    var style = "light";
    if (props.type == "MO") style = "info";
    return <Badge color={style} pill>{props.label}</Badge>
}

export default function Tags(props) {
    const tags = props.value.map((t, i) => <Tag key={i} label={t.name} />)
    return <React.Fragment>{tags}</React.Fragment>
}