import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class CartItem extends Component {
	render () {
		const { _id, productName, category, price, imgUrl, count, removeFromCart } = this.props
		
		return (
			<tr style={{ height: 77 }}>
				<td>
					<img height="60px" src={imgUrl}></img>
				</td>
				<td><NavLink to={`/product/${_id}`}>{productName}</NavLink></td>{//changr url /products/ this id
				} 
				
				<td>{category}</td>
				<td>{`$${price.toFixed(2)}`}</td> {// add $ and after the decimal point .00
				}
				
				<td>
					
					
					<span style={{ display: 'inline-block', width: 50, textAlign: 'center' }}>{count}</span>
					
				
				</td>
				<td>
					<button
						className="btn btn-sm btn-danger"
						onClick={() => {
							removeFromCart(_id)
						}}>
						Remove
					</button>
				</td>
			</tr>
		)
	}
}
