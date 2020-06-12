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

	const product = new Product(null, title, imageUrl, description, price);
	product
		.save()
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res) => {
	Product.fetchAll()
		.then(([row, fieldData]) => {
			res.render('admin/products', {
				prods: row,
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
	Product.findById(productId, (product) => {
		if (!product) {
			res.redirect('/');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res) => {
	const productId = req.body.productId;
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;

	const product = new Product(productId, title, imageUrl, description, price);
	product.save();
	res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	Product.deleteProductById(productId)
		.then(() => {
			res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};
