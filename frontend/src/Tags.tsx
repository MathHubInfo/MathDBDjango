import React from 'react';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase, faTable } from '@fortawesome/free-solid-svg-icons'
import { compareObjects } from './util.tsx';
import type { Tag as TagJSON } from './assets';

const typeOrder = (cat: string): number => {
    if (cat === "category") return 1;
    if (cat === "MO") return 2;
    else return 3;
}

function Category(props: {label: string}) {
    var icon = faTable;
    if (props.label === "system") icon = faDatabase;
    return <Badge color="primary" pill><FontAwesomeIcon icon={icon} /></Badge>
}

function Tag(props: {label: string, type: string}) {
    if (props.type === "category") return <Category label={props.label} />

    const style = props.type === "MO" ? "info": "light";
    return <Badge color={style} pill>{props.label}</Badge>
}

export default function Tags(props: {value: TagJSON[]}) {
    const tagArray = props.value;
    tagArray.sort((a, b) => compareObjects(a, b, (o) => [typeOrder(o.type ?? ""), o.name]));
    const tags = tagArray.map((t, i) => <Tag key={i} label={t.name} type={t.type ?? ""} />)
    return <React.Fragment>{tags}</React.Fragment>
}