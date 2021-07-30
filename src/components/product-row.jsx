import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class ProductRow extends Component {
	state = {
		counter: 0
	}
	
	increment = () => {
		this.setState({
			counter: this.state.counter + 1
		})
	}
	
	decrement = () => {//
		this.setState({
			counter: this.state.counter - 1
		})
	}
	
	render () {
		const { _id, productName, category, price, imgUrl, numberInStock, liked, setLiked, setOrder } = this.props
		const { counter } = this.state
		
		return (
			<tr>
				<td>
					<img height="40px" src={imgUrl} alt=""/>
				</td>
				<td><NavLink to={`/product/${_id}`}>{productName}</NavLink></td>
				<td>{category}</td>
				<td>{`$${price.toFixed(2)}`}</td>
				
				<td align="right">
					<button
						disabled={counter === 0}
						onClick={this.decrement}
						className="btn btn-primary btn-sm">
						-
					</button>
					
					<span className="counter">{counter}</span>
					
					<button
						disabled={counter === numberInStock}
						onClick={this.increment}
						className="btn btn-primary btn-sm"
					>
						+
					</button>
					
					&nbsp;&nbsp;
					
					<button
						className="btn btn-sm btn-success"
						disabled={counter === 0} onClick={() => {
						setOrder(_id, counter,price)
						this.setState({ counter: 0 })
					}}>
						Order
					</button>
				</td>
				
				<td>{numberInStock}</td>
				
				<td>
					<img style={{ imgUrl: 'blue' }} alt=""/>
					
					<button className={'btn btn-' + (liked ? 'danger' : 'secondary')} onClick={() => setLiked(_id)}>
						<i className={'fa fa-heart' + (liked ? '' : '-o')}/>
					</button>
				</td>
			</tr>
		)
	}
}
