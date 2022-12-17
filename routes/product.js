const router = require('express').Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Store a product
router.post('/', productController.storeNewProduct);

//Get single product
router.get('/:id', productController.getOneProduct);

//update product
router.patch('/:id', productController.updateOneProduct);

//delete product
router.delete('/:id', productController.deleteOneProduct);

module.exports = router;