import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import type { Reference as ReferenceJSON, Collection as CollectionJSON } from './assets'

// spellchecker:words arxiv

export default class References extends Component<{ value: CollectionJSON}> {
    
    render() {
        const cId = this.props.value.id;
        const refList = this.props.value.references;
        if (typeof refList === "undefined") return null;
        const refs = refList.map((item, i) => (<Reference key={i} reference={cId + "-" + i} value={item} />));
        return(
            <React.Fragment>
                {refs}
            </React.Fragment>
        );
    }
    
}

type ReferenceProps = {
    reference: string;
    value: ReferenceJSON;
}
class Reference extends Component<ReferenceProps, { tooltipOpen: boolean }> {
                                          
    constructor(props: ReferenceProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { tooltipOpen: false };
    }
    
    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    render() {
        var icon = "icon-sphere";
        var url = this.props.value.value;
        var arr = this.props.value.type;
        var tooltip = "Website";
        if (arr === "doi") {
            icon = "icon-doi";
            url = "https://doi.org/" + url;
            tooltip = "DOI: Digital Object Identifier";
        }
        if (arr === "rg") {
            icon = "icon-researchgate";
            url = "https://www.researchgate.net/publication/" + url;
            tooltip = "ResearchGate";
        }
        if (arr === "arxiv") {
            icon = "icon-arxiv";
            url = "https://arxiv.org/abs/" + url;
            tooltip = "Arxiv";
        }
        
        if (arr === "isbn") return(
            <span className="isbn">{url}</span>
        );
        else return (
            <React.Fragment>
                <a href={url} className="icn" id={"ref" + this.props.reference}><span className={icon}></span></a>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target={"ref" + this.props.reference} toggle={this.toggle}>
                    {tooltip}
                </Tooltip>
            </React.Fragment>
        );
    }
}