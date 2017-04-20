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
        			console.log("Geolocation not supported by this browser");
    			}
         
		}
	
	//Success function for Geolocation
	showPosition(position) {
			//API Request for stores carrying product that are near
			axios.get(`http://lcboapi.com/stores?${APIKEY}&product_id=${this.props.id}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&per_page=20`)
			.then(res =>{
				console.log(res);
				this.setState({
					stores: res.data.result
				});
				this.open();
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
		this.setState({showModal:false});
	}
	//Open the Modal
	open(){
		this.setState({showModal:true});
	}



	render(){

		return(
			<div className="beerViewPane">
			<Row>
				<Col md={6}>
					<h3><strong>{this.props.name}</strong></h3>
					<hr/>
					<div className="text-left">
						<h4><strong>Style:</strong> {this.props.style}</h4>
						<h4><strong>Price:</strong> {this.props.price /100}</h4>
						<h4><strong>Volume:</strong> {this.props.volume}</h4>
						<h4><strong>Alcohol:</strong> {this.props.alcohol/100}%</h4>
						<h4><strong>Tasting Notes:</strong>{this.props.tasteNotes}</h4>
					</div>
					<hr/>
					<Button bsStyle="primary" bsSize="large" onClick={()=>this.findStores()}>Find Stores Near You</Button>

					<p><small>Pressing this button will prompt you for your permission to use your location</small></p>

				{/*This modal will pop up upon user input and show the 10 nearest locations to them that carry the produce*/}
					 <Modal show={this.state.showModal} onHide={this.close}>
         				<Modal.Header closeButton>
            				<Modal.Title>Stores near you with {this.props.name}</Modal.Title>
          				</Modal.Header>
          				<Modal.Body>
           				 {
           				 	this.state.stores.map(function(store){
           				 	var storestring="https://www.google.com/maps?saddr={My+Location}&daddr="+store.address_line_1;
							return(
								<ListGroupItem  key={store.id}>{store.name} <a href={storestring} target="_blank" className="pull-right"><i className="fa fa-map-marker" aria-hidden="true"></i> Directions</a></ListGroupItem>
								);
						}, this)}
          				</Modal.Body>
          				<Modal.Footer>
            				<Button onClick={this.close}>Close</Button>
         				 </Modal.Footer>
       				 </Modal>

				</Col>
				<Col md={6}>
				{/*This is the image of the product, using a conditional ternary operator to check if there is an image available*/}
					<Thumbnail src={(this.props.image == null)?"http://beaus.ca/wp-content/uploads/2014/12/logo.png":this.props.image} alt="No image available"/>
				
				</Col>
			</Row>
			</div>
			)
	}
}