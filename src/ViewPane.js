import React, {Component} from 'react';
import axios from 'axios';
import {Thumbnail ,Row, Col, Button, Modal , ListGroupItem} from 'react-bootstrap';

const APIKEY = ""
export default class ViewPane extends Component{

	constructor(props){
		super(props);
		this.state ={
			stores :[],
			showModal: false
		}
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	findStores(){

		axios.get(`http://lcboapi.com/stores?access_key=MDpiNDg1ODZiYy0yNDY2LTExZTctODY5Ny1iMzNlNTU1YWY1YzY6eWhBOE8wQkVrNHh2Z0xHbFh2ZzRBNHlRR25BTTVpVlNVQ2RC&product_id=${this.props.id}`)
			.then(res =>{
				console.log(res);
				this.setState({
					stores: res.data.result
				})
				this.open()
			})
	}

	close(){
		this.setState({showModal:false})
	}
	open(){
		this.setState({showModal:true})
	}

	//Need to add a map function for stores after the Button inside a Modal or some neccessity closable
	render(){

		return(
			<div className="beerViewPane">
			<Row>
				<Col md={6}>
					<h3>{this.props.name}</h3>
					<p><strong>Style:</strong> {this.props.style}</p>
					<p><strong>Price:</strong> {this.props.price /100}</p>
					<p><strong>Volume:</strong> {this.props.volume}</p>
					<p><strong>Alcohol:</strong> {this.props.alcohol/100}%</p>
					
					<Button bsStyle="primary" bsSize="large" onClick={()=>this.findStores()}>Find Stores Near You</Button>
					 <Modal show={this.state.showModal} onHide={this.close}>
         				 <Modal.Header closeButton>
            				<Modal.Title>Stores near you with {this.props.name}</Modal.Title>
          				</Modal.Header>
          				<Modal.Body>
           				 {this.state.stores.map(function(store){
							return(
								<ListGroupItem  key={store.id}>{store.name} <a className="pull-right">Directions</a></ListGroupItem>
								);
						}, this)}
          				</Modal.Body>
          				<Modal.Footer>
            				<Button onClick={this.close}>Close</Button>
         				 </Modal.Footer>
       				 </Modal>
				</Col>
				<Col md={6}>
				<Thumbnail src={this.props.image} alt="No Image Available"/>
				</Col>
			</Row>
			</div>
			)
	}
}