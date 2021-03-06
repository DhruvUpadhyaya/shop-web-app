const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;

	req.user
		.createProduct({
			title: title,
			imageUrl: imageUrl,
			description: description,
			price: price,
		})
		.then((result) => {
			console.log('Product Created');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res) => {
	req.user
		.getProducts()
		// Product.findAll()
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res) => {
	const editMode = req.query.edit;

	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	req.user
		.getProducts({ where: { id: productId } })
		// Product.findByPk(productId)
		.then((products) => {
			const product = products[0];
			if (!product) {
				res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res) => {
	const productId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;
	Product.findByPk(productId)
		.then((product) => {
			product.title = title;
			product.imageUrl = imageUrl;
			product.description = description;
			product.price = price;

			return product.save();
		})
		.then((result) => {
			console.log('UPDATED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	Product.findByPk(productId)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			console.log('PRODUCT DELETED');
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};
