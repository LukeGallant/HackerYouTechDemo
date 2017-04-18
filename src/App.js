import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import BeerPicker from './BeerPicker.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Grid>
        <Row>
          <Col xs={12} md={12}>
          <div className="App-header">
            <h1>Beau's All-Natural Brewing</h1>
            <h2>Seasonal Beer Finder</h2>
          </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <p className="App-intro">
              In partnership with the LCBO, Beau's All Natural Brewing has an exciting new way to connect you with our beer! Our numerous seasonal offerings can be viewed and tracked to the closest LCBO.
            </p>
          </Col>
        </Row>
        <BeerPicker />
        </Grid>
      </div>
    );
  }
}

export default App;
