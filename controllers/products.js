const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
	res.render('add-product', {
		title: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getProduct = (req, res) => {
	const products = Product.fetchAll();
	res.render('shop', {
		products: products,
		title: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
	});
};
