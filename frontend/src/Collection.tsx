import React, { Component } from 'react';

import type {Author as AuthorJSON } from './assets';

export default class Collection extends Component<{
    show: boolean,
    url: string,
    text: string,
    authors: AuthorJSON[]
}> {
    render() {
        return(
            <React.Fragment>
                <a href={this.props.url}>{this.props.text}</a><br/>
                <Authors show={this.props.show} data={this.props.authors} />
            </React.Fragment>
        );
    }
}

function Author(props: { data: AuthorJSON}) {
    const fullname = props.data.givenName + " " + props.data.familyName
    if (!(props.data.url === null)) return <a href={props.data.url} className="author text-muted">{fullname}</a>;
    else return <span className="author text-muted">{fullname}</span>
}

function Authors(props: { show: boolean, data: AuthorJSON[]}) {
    if ((typeof props.data !== 'undefined') && props.show) return(
        <React.Fragment>
            {props.data.map((a, i) => <React.Fragment key={i}>{!!i && ", "} <Author data={a} /></React.Fragment> )}
        </React.Fragment>
    );
    else return null;
}