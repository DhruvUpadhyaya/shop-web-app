const Product = require('../models/product');

exports.getProduct = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			products: products,
			title: 'Shop',
			path: '/products',
			hasProducts: products.length > 0,
		});
	});
};

exports.getIndex = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			products: products,
			title: 'All Products',
			path: '/',
			hasProducts: products.length > 0,
		});
	});
};

exports.getCart = (req, res) => {
	res.render('shop/cart', { title: 'Cart', path: '/cart' });
};

exports.getCheckout = (req, res) => {
	res.render('shop/checkout', { title: 'Check-Out', path: '/checkout' });
};
