import React from 'react'
import { BrowserRouter, Switch, Route, NavLink, withRouter } from 'react-router-dom'
import Products from './pages/products.jsx'
import Cart from './pages/cart.jsx'
import './main.scss'
import { products } from './store/fakeProductsService.js'
import ProductPage from './pages/product.jsx'

export default class App extends React.Component {
	state = {
		products,	// all products
		cart: []     //products in crat
	}
	
	addToCart = (_id, count,price) => { // add produt to cart
		this.setState({
			cart: [...this.state.cart, {  // copy cart to new cart
				_id, count,price
			}]
		})
	}
	
	removeFromCart = (_id) => {   // delete product from cart
		this.setState({
			cart: this.state.cart.filter(p => p._id !== _id)
		})
	}
	
	setLiked = (_id) => { // like/unlike
		const { products } = this.state
		
		this.setState({
			products: products.map(product => {
				if (product._id === _id) {
					product.liked = !product.liked   // chande the like  in this product
				}
				return product
			})
		})
	}
	
	setOrder = (_id, counter,price) => { //order button- add to cart
		const { products } = this.state
		
		this.addToCart(_id, counter,price)// send to function addToCart()=> "id, counter and price"
	}
	
	buy = () => {
		this.state.cart.forEach(({ _id, count }) => { // accept order and buy, u 
			this.setState({
				products: products.map(product => {
					if (product._id === _id) {
						product.numberInStock -= count // update the numberInStock of this product
					}
					return product
				})
			})
		})
		
		this.setState({
			cart: []   // Empty cart
		})
	}
	
	render () {
		const { products, cart } = this.state
		
		return (
			<BrowserRouter>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<NavLink className="navbar-brand" to="/">Products</NavLink>
					<NavLink className="navbar-brand" to="/cart">Cart
						({cart.reduce((a, b) => a + b.count, 0)})</NavLink>
				</nav>
				
				<Switch>
					<Route
						path="/"
						exact
						render={() =>
							<Products
								products={products}
								setOrder={this.setOrder}
								setLiked={this.setLiked}
							/> // default route
						}/>
					
					<Route
						path="/cart"
						exact
						render={() =>
							<Cart
								products={products}
								cart={cart}
								removeFromCart={this.removeFromCart}
								buy={this.buy}
								/> // route to cart product page
						}/>
					
					<Route
						path="/product/:id"
						render={() =>
							<ProductPage
								products={products}
							/> // route to specific product page Using :id
						}
					/>
				</Switch>
			
			</BrowserRouter>
		)
	}
}