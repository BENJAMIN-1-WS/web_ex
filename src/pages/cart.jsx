import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CartItem from '../components/cart-item.jsx'

class Cart extends Component {
	onBuyClick = () => {// if buy is press 
		this.props.buy() // starting "buy" function
		this.props.history.push('/')// return to home page
	}
	
	render () {
		const { cart, products, removeFromCart } = this.props
		const total=cart.reduce(function(a,b){
				return a+=(b.count*b.price)
				
		}, 0)// calculationg total price of cart
		return (
			<div className="container">
				<h2>Cart</h2>
				<hr/>
				
				<table>
					<thead>
					<tr>
						<th style={{ width: '15%' }}>Image</th>
						<th style={{ width: '15%' }}>Name</th>
						<th style={{ width: '20%' }}>Category</th>
						<th>Price</th>
						<th>Count</th>
						<th/>
						<th/>
					</tr>
					</thead>
					
					<tbody>
					{cart.map(({ _id, count }) => {
						const product = products.find(p => p._id === _id) // serch product
						
						return (
							<CartItem
								key={_id}
								{...product}
								count={count}
								removeFromCart={removeFromCart}
							/>
						)
					})}
					</tbody>
				</table>
				
				<hr/>
				
				<button //button buy
					className="btn btn-sm btn-success"
					disabled={cart.length === 0}
					onClick={this.onBuyClick}
				>
					Buy!
				</button>
						
				<span>total:{`$${total.toFixed(2)}`} </span> 
			</div>//total price in cart
		)
	}
}

export default withRouter(Cart)//