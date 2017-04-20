import React, {Component} from 'react';
import axios from 'axios';
import {Thumbnail ,Row, Col, Button, Modal , ListGroupItem} from 'react-bootstrap';

//Constant Variables (API KEYS etc.)
const APIKEY = "access_key=MDpiNDg1ODZiYy0yNDY2LTExZTctODY5Ny1iMzNlNTU1YWY1YzY6eWhBOE8wQkVrNHh2Z0xHbFh2ZzRBNHlRR25BTTVpVlNVQ2RC"

export default class ViewPane extends Component{

	constructor(props){
		super(props);
		this.state ={
			stores :[],
			showModal: false
		}
		//Function Binders
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.showPosition = this.showPosition.bind(this);
		this.showError= this.showError.bind(this);
	}
	//OnClick function that will Find the Nearest 10 Stores to the user
	findStores(){
		//Grab the position of the user
		 if (navigator.geolocation) {
       			 navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    		} else { 
        			console.log("Geolocation not supported by this browser")
    			}
         
		}
	
	//Success function for Geolocation
	showPosition(position) {
			//API Request for stores carrying product that are near
			axios.get(`http://lcboapi.com/stores?${APIKEY}&product_id=${this.props.id}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&per_page=10`)
			.then(res =>{
				console.log(res);
				this.setState({
					stores: res.data.result
				})
				this.open()
			});

	}
	//Error function (standard) for Geolocation(HTML5)
	showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            console.log("Permission Error")
	            break;
	        case error.POSITION_UNAVAILABLE:
	            console.log("Position Unavailable")
	            break;
	        case error.TIMEOUT:
	            console.log("Timeout")
	            break;
	        case error.UNKNOWN_ERROR:
	           console.log("Unknown Error")
	            break;
	    	}
	}
	//Close the Modal
	close(){
		this.setState({showModal:false})
	}
	//Open the Modal
	open(){
		this.setState({showModal:true})
	}


	render(){

		return(
			<div className="beerViewPane">
			<Row>
				<Col md={6}>
					<h3>{this.props.name}</h3>

					<div className="text-left">
						<p><strong>Style:</strong> {this.props.style}</p>
						<p><strong>Price:</strong> {this.props.price /100}</p>
						<p><strong>Volume:</strong> {this.props.volume}</p>
						<p><strong>Alcohol:</strong> {this.props.alcohol/100}%</p>
						<p><strong>Tasting Notes:</strong>{this.props.tasteNotes}</p>
					</div>

					<Button bsStyle="primary" bsSize="large" onClick={()=>this.findStores()}>Find Stores Near You</Button>

					<p><small>Pressing this button will prompt you for your permission to use your location</small></p>

				{/*This modal will pop up upon user input and show the 10 nearest locations to them that carry the produce*/}
					 <Modal show={this.state.showModal} onHide={this.close}>
         				 <Modal.Header closeButton>
            				<Modal.Title>Stores near you with {this.props.name}</Modal.Title>
          				</Modal.Header>
          				<Modal.Body>
           				 {this.state.stores.map(function(store){
							return(
								<ListGroupItem  key={store.id}>{store.name} <a className="pull-right"><i className="fa fa-map-marker" aria-hidden="true"></i> Directions</a></ListGroupItem>
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