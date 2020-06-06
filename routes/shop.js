const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.post('/add-to-cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/checkout', shopController.getCheckout);

router.get('/product/:productId', shopController.getProduct);

router.get('/orders', shopController.getOrders);

module.exports = router;
