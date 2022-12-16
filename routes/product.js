const router = require('express').Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.index);

// Store a product
router.post('/', productController.store);

//Get single product
router.get('/:id', productController.show);

//update product
router.patch('/:id', productController.update);

//delete product
router.delete('/:id', productController.destroy);

module.exports = router;