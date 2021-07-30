import React from 'react'
import { withRouter } from 'react-router-dom'

class Product extends React.Component {
	render () {
		const { match, products } = this.props // match withRouter and products

		const product = products.find(product => product._id === match.params.id)// find roduct by id
		const { productName, category, price, imgUrl, numberInStock, description } = product
		
		return (
			<div>
				<div className="container">
					<h2>{productName}</h2>
					<hr/>
					
					<div>
						<img height="160px" src={imgUrl} alt="" />
					</div>
					<br/>
					
					<dl>
						<dt>Category</dt>
						<dd>{category}</dd>
						
						<dt>Price</dt>
						<dd>{`$${price.toFixed(2)}`}</dd>
						
						<dt>Number in stock</dt>
						<dd>{numberInStock}</dd>
					</dl>
					
					<div>{description}</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Product)