import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Container, Row, Col } from 'reactstrap';
import Tabs from './Tabs.js';
import './App.css';
import newState from './data.js';

const api = process.env.REACT_APP_MATHDBAPI || '';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = { columns: "general", tbColumns: [], tbData: [] };
        this.toggleDisplay = this.toggleDisplay.bind(this);
        
        this.update = (selectedColumns) => {
            const that = this;
            // TODO: pagination
            // the following will only show the first page of Django results;
            fetch(api + '/collections.json').then(function(response) {
                return response.json();
            }).then(function(data) {
                that.setState(newState(selectedColumns, data));
            });
        }
        this.update(this.state.columns)
    }
    
    toggleDisplay(selected) {
        this.update(selected);
    }
    
    render() {
        return (
            <Container className="App">
                <Row>
                    <Col>
                        <h1>Catalogue of Mathematical Datasets</h1>
                        <p>See the <a href="https://github.com/MathHubInfo/Documentation/wiki/Math-Databases">wiki</a> for the non-tabulated contents as well as for more information.</p>
                        <p>The information in this catalogue is incomplete, please <a href="https://kwarc.info/people/kbercic/">help me fill it in</a>.</p>

                        <Tabs active={this.state.columns} toggleDisplay={(c) => this.toggleDisplay(c)} />

                        <ReactTable
                            data={this.state.tbData}
                            columns={this.state.tbColumns}
                            className={"-striped"}
                            sortable={true}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default App;