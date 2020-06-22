const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'Products',
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res) => {
	const productId = req.params.productId;
	Product.findByPk(productId)
		.then((product) => {
			res.render('shop/product-detail', {
				pageTitle: 'Product Detail',
				product: product,
				path: '/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getIndex = (req, res) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'All Products',
				path: '/',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart
				.getProducts()
				.then((products) => {
					res.render('shop/cart', {
						pageTitle: 'Your Cart',
						path: '/cart',

						products: products,
					});
				})
				.catch((err) => {
					console.log(err);
				});
			//console.log(cart);
		})
		.catch((err) => {
			console.log(err);
		});
	// Cart.getCart((cart) => {
	// 	Product.fetchAll((products) => {
	// 		const cartProducts = [];
	// 		for (product of products) {
	// 			const cartProductData = cart.products.find((p) => p.id === product.id);
	// 			if (cartProductData) {
	// 				cartProducts.push({ productData: product, qty: cartProductData.qty });
	// 			}
	// 		}
	// 		res.render('shop/cart', {
	// 			pageTitle: 'Your Cart',
	// 			path: '/cart',
	// 			totalPrice: cart.totalPrice,
	// 			products: cartProducts,
	// 		});
	// 	});
	// });
};

exports.postCart = (req, res) => {
	const productId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			let product;
			if (products.length > 0) {
				product = products[0];
			}

			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity + 1;
				return product;
			}
			return Product.findByPk(productId);
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: { quantity: newQuantity },
			});
		})
		.then(() => {
			res.redirect('/cart');
		})
		.catch((err) => {
			console.log(err);
		});
	// Product.findById(productId, (product) => {
	// 	Cart.addProduct(productId, product.price);
	// 	res.redirect('/cart');
	// });
};

exports.postCartDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			const product = products[0];
			return product.cartItem.destroy();
		})
		.then((result) => {
			res.redirect('/cart');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postOrder = (req, res) => {
	let fetchedCart;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts();
		})
		.then((products) => {
			req.user
				.createOrder()
				.then((order) => {
					return order.addProducts(
						products.map((product) => {
							product.orderItem = { quantity: product.cartItem.quantity };
							return product;
						})
					);
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.then((result) => {
			//clean up the cart
			return fetchedCart.setProducts(null);
		})
		.then((result) => {
			res.redirect('/orders');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCheckout = (req, res) => {
	res.render('shop/checkout', { pageTitle: 'Check-Out', path: '/checkout' });
};

exports.getOrders = (req, res) => {
	req.user
		.getOrders({ include: ['products'] })
		.then((orders) => {
			res.render('shop/orders', {
				pageTitle: 'Orders',
				path: '/orders',
				orders: orders,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
