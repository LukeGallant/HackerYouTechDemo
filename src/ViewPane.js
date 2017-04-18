import React, {Component} from 'react';
import axios from 'axios';

export default class ViewPane extends Component{
	constructor(props){
		super(props);
		this.state ={
			stores :[]
		}
	}

	componentDidMount(){
		const storeBeer= this.props.id;
		axios.get(`http://lcboapi.com/inventories?access_key=MDpiNDg1ODZiYy0yNDY2LTExZTctODY5Ny1iMzNlNTU1YWY1YzY6eWhBOE8wQkVrNHh2Z0xHbFh2ZzRBNHlRR25BTTVpVlNVQ2RC&product_id=${storeBeer}`)
			.then(res =>{
				console.log(res);
				this.setState({
					storeData: res.data.result
				})
			})
	}

	render(){
		return(
			<div>
				{this.props.name}
				<img src={this.props.image} alt="No Image Available"/>
			</div>
			)
	}
}