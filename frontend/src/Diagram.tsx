import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import FAIR from './FAIR.json';

// spellchecker:disable
const defaultValue = {
    F: "UUUXXUXXUUUU",
    A: "UUUUUUUUUXXU",
    I: "UUUUUUUUU",
    R: "UUUUXUUUUUUU"
} as const;
// spellchecker:enable

type FairClass = keyof typeof defaultValue

const cellClass = {
    "T": "diagram-true",
    "M": "diagram-somewhat",
    "F": "diagram-false",
    "X": "diagram-blank",
    "U": "diagram-unknown",
} as const

type DiagramClass = keyof typeof cellClass



type DiagramJSON = {
    id: string,
    type: keyof typeof defaultValue,
    value: string,
}

export default class Diagram extends Component<DiagramJSON> {
    render() {
        const model = FAIR[this.props.type];
        var value = this.props.value;
        if (value === null) value = defaultValue[this.props.type];
        const rows = model.levels.map((p, i) => {
            const meta = {
                id: this.props.id,
                type: this.props.type,
                item: p
            }
            return <Row key={p} meta={meta} values={value.slice(3*i, 3*i+3)} />;
        });
        return(
            <table className="diagram">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
    
}

type Meta = {id: string; type: FairClass; item: string}

function Row(props: {
    values: string,
    meta: Meta,
}) {
    const levels = ["D", "A", "M"];
    const cells = props.values.split('').map((c, i) => {
        var key = props.meta.type + props.meta.item + levels[i]
        if (c === "X") return <td key={key} className={cellClass[c]}></td>
        else return <Cell key={key} meta={props.meta} value={c as DiagramClass} divId={"c" + props.meta.id + "-" + props.meta.type + props.meta.item + levels[i]} level={levels[i]} />;
    })
    return (
        <tr>
            {cells}
        </tr>
    );
}

type CellProps = {
    value: DiagramClass,
    divId: string,
    level: string,
    meta: Meta,
}


class Cell extends Component<CellProps, {
    tooltipOpen: boolean
}> {
    
    constructor(props: CellProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }
    
    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }
    
    render() {
        return (
            <td className={cellClass[this.props.value]}>
                <a className="tooltip-field" id={this.props.divId} href={"https://github.com/MathHubInfo/Documentation/wiki/Math-Databases#" + this.props.meta.type + this.props.meta.item}>&nbsp;</a>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={this.props.divId} toggle={this.toggle}>
                    {(FAIR as any)[this.props.meta.type][this.props.meta.item][this.props.level]}
                </Tooltip>
            </td>
        );
    }
}