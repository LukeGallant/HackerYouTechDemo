import React, {Component} from 'react';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';


import ViewPane from './ViewPane.js'

//CONSTANTS
const APIKEY="access_key=MDpiNDg1ODZiYy0yNDY2LTExZTctODY5Ny1iMzNlNTU1YWY1YzY6eWhBOE8wQkVrNHh2Z0xHbFh2ZzRBNHlRR25BTTVpVlNVQ2RC"


class BeerPicker extends Component{
	constructor(props){
		super(props);

		this.state = {
			beers : [],
			currentBeer : [],
			storeData: [],
			lcboStoreList: []
		};
	}

	renderData(beer){
		console.log(beer.name);
		console.log(beer.image_url);
		this.setState({
			currentBeer: beer
		})
		
	}

	componentDidMount(){
		axios.get(`http://lcboapi.com/products?${APIKEY}&where=is_seasonal&q=beaus%27s+all&where_not=is_dead`)
			.then(res =>{
				console.log(res);
				this.setState({
					beers: res.data.result,
					currentBeer: res.data.result[0]
				})
			})
			
	}

	render(){
		return(
			<Row>
			<Col xs={12} md={4}>
				<h2 className="heading">Choose a Beer</h2>
				<ListGroup className="beerListPicker">
				{this.state.beers.map(function(beer){
					return(
						<ListGroupItem className="beerListItem" key={beer.id} onClick={()=>this.renderData(beer)}>{beer.name}</ListGroupItem>
						);
				}, this)}
				</ListGroup>
			</Col>
			<Col xs={12} md={8}>
				<h2 className="heading"><i className="fa fa-beer" aria-hidden="true"></i> Beer Information <i className="fa fa-beer" aria-hidden="true"></i></h2>
				<ViewPane name={this.state.currentBeer.name} image={this.state.currentBeer.image_url}
						  price={this.state.currentBeer.price_in_cents} volume={this.state.currentBeer.package}
						  alcohol={this.state.currentBeer.alcohol_content} style={this.state.currentBeer.varietal}
						  id={this.state.currentBeer.id} tasteNotes={this.state.currentBeer.style} />
			</Col>
			</Row>




			)
	}
}
export default BeerPicker;