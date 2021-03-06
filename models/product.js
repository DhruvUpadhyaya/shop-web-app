const getDb = require('../util/database').getDb;

class Product {
	constructor(title, price, imageUrl, description) {
		this.title = title;
		this.price = price;
		this.price = imageUrl;
		this.description = description;
	}
}

const Product = sequelize.define('product', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Product;
