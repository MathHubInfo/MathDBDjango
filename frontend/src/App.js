import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Container, Row, Col } from 'reactstrap';
import Tabs from './Tabs.js';
import './App.css';
import newState from './data.js';

const api = process.env.REACT_APP_MATHDBAPI || (window.location.hostname === "localhost" ? "http://localhost:8000" : "https://api.mathdb.mathhub.info");

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = { columns: "general", tbColumns: [], tbData: [] };
        this.toggleDisplay = this.toggleDisplay.bind(this);
        
        this.update = (selectedColumns) => {
            const that = this;
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
                        <p>See the <a href="https://github.com/MathHubInfo/Documentation/wiki/Math-Databases">wiki</a> for the non-tabulated contents of this catalogue.</p>

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