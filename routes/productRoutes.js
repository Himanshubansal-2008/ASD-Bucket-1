const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware, itemCacheMiddleware } = require('../middleware/cacheMiddleware');

router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', itemCacheMiddleware, productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.patch('/:id', productController.patchProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
