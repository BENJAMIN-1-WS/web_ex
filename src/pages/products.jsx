import React, { Component } from 'react'
import ProductRow from '../components/product-row.jsx'

const Categories = ({ selectedCategory, categories, onCategoryChange }) => {
	return (
		<div>
			<div className="form-check">
				<input className="form-check-input" type="checkbox"
				       id="all" checked={selectedCategory === 'all'}
				       onChange={onCategoryChange}
				/>&nbsp;&nbsp;
				<label className="form-check-label" htmlFor="all">
					All categories
				</label>
			</div>
			
			{Object.keys(categories).map(category => {
				return (
					<div key={category} className="form-check">
						<input className="form-check-input" type="checkbox" id={category}
						       checked={selectedCategory === category}
						       onChange={onCategoryChange}
						/>&nbsp;&nbsp;
						<label className="form-check-label" htmlFor={category}>
							{category}
						</label>
					</div>
				)
			})}
		</div>
	)
}

const Pagination = ({ pages, page, setPage }) => {
	return (
		<div>
			{[...new Array(pages)].map((_, i) => {
				const current = i + 1
				const className = 'btn btn-sm btn-' + (page === current ? 'primary' : 'secondary')
				
				return (
					<button
						style={{ marginRight: 5 }}
						key={current}
						className={className}
						onClick={() => setPage(current)}
					>
						{current}
					</button>
				)
			})}
		</div>
	)
}

const ProductsList = ({ sortedProducts, page, perPage, setLiked, setOrder }) => {
	const productsByPage = sortedProducts.filter((_, i) => (i < page * perPage) && (i >= (page - 1) * perPage))
	
	return productsByPage.map(product => {
		return (
			<ProductRow
				key={product._id}
				{...product}
				setLiked={setLiked}
				setOrder={setOrder}
			/>
		)
	})
}

export default class Products extends Component {
	state = {
		page: 1,
		perPage: 4,
		selectedCategory: 'all',
		sortBy: null,
		sortDir: 'asc'
	}
	
	onCategoryChange = e => {//change category
		this.setState({
			selectedCategory: e.target.id,
			page: 1   // return to page one(default)
		})
	}
	
	sort = (sortBy) => { //sort by colomn
		if (this.state.sortBy === sortBy) {
			this.setState({ sortDir: this.state.sortDir === 'asc' ? 'dsc' : 'asc' })//change state
		} else {
			this.setState({ sortBy, sortDir: 'asc' })//change state
		}
	}
	
	setPage = page => this.setState({ page })// update page
	
	render () {
		const { products, setOrder, setLiked } = this.props // 
		const { page, perPage, selectedCategory, sortBy, sortDir } = this.state
		
		const categories = _.groupBy(products, 'category') // make group of all product category from products
		
		const filteredProducts = [...selectedCategory === 'all'
			? products
			: products.filter(product => product.category === selectedCategory)]// filert pruducts by category
		
		const sortedProducts = !sortBy // dsc || asc
			? filteredProducts
			: filteredProducts.sort((a, b) => {
				if (sortDir === 'dsc') {
					return a[sortBy] > b[sortBy] ? -1 : 1
				} else {
					return a[sortBy] < b[sortBy] ? -1 : 1
				}
			})
		
		const pages = Math.ceil(sortedProducts.length / perPage) // pagination 
		
		return (
			<div>
				<div className="container2">
					<h2>Products</h2>
					<hr/>
					
					<div className="row">
						<div className="col-md-3">
							<Categories
								selectedCategory={selectedCategory}
								categories={categories}
								onCategoryChange={this.onCategoryChange}
								
							/>
						</div>
						<div className="col-md-9">
							<table className="table">
								<thead>
								<tr>
									<th style={{ width: '15%' }}>
										<span>Image</span>
									</th>
									<th style={{ width: '15%' }}>
										<span>Name</span>&nbsp;&nbsp;
										<i
											className={`fa fa-chevron-down sort-btn ${sortBy === 'productName' ? 'selected' : ''} ${sortDir === 'dsc' ? 'ud' : ''}`}
											onClick={() => this.sort('productName')}
										/>
									</th>
									<th style={{ width: '20%' }}>
										<span>Category</span>&nbsp;&nbsp;<i
										className={`fa fa-chevron-down sort-btn ${sortBy === 'category' ? 'selected' : ''} ${sortDir === 'dsc' ? 'ud' : ''}`}
										onClick={() => this.sort('category')}
									/>
									</th>
									<th>
										<span>Price</span>&nbsp;&nbsp;<i
										className={`fa fa-chevron-down sort-btn ${sortBy === 'price' ? 'selected' : ''} ${sortDir === 'dsc' ? 'ud' : ''}`}
										onClick={() => this.sort('price')}
									/>
									</th>
									<th>
										<span/>
									</th>
									<th>
										<span>Stock</span> &nbsp;&nbsp;<i
										className={`fa fa-chevron-down sort-btn ${sortBy === 'numberInStock' ? 'selected' : ''} ${sortDir === 'dsc' ? 'ud' : ''}`}
										onClick={() => this.sort('numberInStock')}
									/>
									</th>
									<th>
										<span>Like</span>
									</th>
								</tr>
								</thead>
								
								<tbody style={{ height: 500 }}>
								
									<ProductsList // products ui of table
										sortedProducts={sortedProducts}
										page={page}
										perPage={perPage}
										setLiked={setLiked}
										setOrder={setOrder}
										
									/>
								
								</tbody>
							
							</table>
							
							
							<hr/>
							
							<div>
								<Pagination
									pages={pages}
									page={page}
									setPage={this.setPage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}