const path = require('path')

module.exports = {
	mode: 'development',
	devtool: 'eval',
	entry: path.resolve('src/index.js'),
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		historyApiFallback:true
	},
	
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
						]
					}
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpe?g|gif|png|svg|ico|mp3)$/,
				use: [
					`file-loader`,
				]
			}
		]
	},
}