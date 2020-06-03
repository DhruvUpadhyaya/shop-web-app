const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'Products',
			path: '/products',
			hasProducts: products.length > 0,
		});
	});
};

exports.getProduct = (req, res) => {
	const productId = req.params.productId;
	Product.findById(productId, (product) => {
		res.render('shop/product-detail', {
			pageTitle: 'Product Detail',
			product: product,
			path: '/products',
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

exports.postCart = (req, res) => {
	const productId = req.body.productId;
	Product.findById(productId, (product) => {
		Cart.addProduct(productId, product.price);
		res.redirect('/');
	});
};

exports.getCheckout = (req, res) => {
	res.render('shop/checkout', { pageTitle: 'Check-Out', path: '/checkout' });
};

exports.getOrders = (req, res) => {
	res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};
