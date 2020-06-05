const fs = require('fs');
const path = require('path');

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json'
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const exsistingProductIndex = products.findIndex(
					(product) => product.id === this.id
				);

				const updatedProducts = [...products];
				updatedProducts[exsistingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}

	static deleteProductById(id) {
		getProductsFromFile((products) => {
			const delProductIndex = products.findIndex((p) => p.id === id);
			const updatedProducts = [...products];
			let temp = updatedProducts[delProductIndex];
			updatedProducts[delProductIndex] =
				updatedProducts[updatedProducts.length - 1];
			updatedProducts[updatedProducts.length - 1] = temp;
			updatedProducts.pop();

			fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
				console.log(err);
			});
		});
	}
};
