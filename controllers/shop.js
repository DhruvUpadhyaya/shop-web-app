const Product = require('../models/product');

exports.getProduct = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'Products',
			path: '/products',
			hasProducts: products.length > 0,
		});
	});
};

exports.getIndex = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'All Products',
			path: '/',
			hasProducts: products.length > 0,
		});
	});
};

exports.getCart = (req, res) => {
	res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' });
};

exports.getCheckout = (req, res) => {
	res.render('shop/checkout', { pageTitle: 'Check-Out', path: '/checkout' });
};

exports.getOrders = (req, res) => {
	res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};
