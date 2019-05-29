import React, { Component } from 'react';
import { Badge } from 'reactstrap';

function Tag(props) {
    return <Badge color="light" pill>{props.label}</Badge>
}

export default function Tags(props) {
    const tags = props.value.map((t, i) => <Tag key={i} label={t.name} />)
    return <React.Fragment>{tags}</React.Fragment>
}