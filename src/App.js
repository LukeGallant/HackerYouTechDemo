import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';

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
            <Image src="http://cdn.shopify.com/s/files/1/0255/0283/t/5/assets/logo.svg?6887" responsive className="center-block" />
            <h1>Seasonal Beer Finder</h1>
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
        <hr className="divider"/>
        <footer className="text-center">Sample App for HackerYou made by Luke Gallant</footer>
        </Grid>
      </div>
    );
  }
}

export default App;
