const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.getProduct);

module.exports = router;
