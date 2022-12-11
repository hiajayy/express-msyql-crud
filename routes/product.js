const express = require('express');
const connection = require('../connection');
const router = express.Router();


// Get all products
router.get('/', (request, response, next) => {
    let query = "SELECT * FROM products";
    connection.query(query, (error, result) => {
        if (!error) {
            return response.json({ success: true, message: "Get all products successfully.", data: result });
        } else {
            return response.status(500).json({ success: false, message: error, data: {} });
        }
    })
});

// Store a product
router.post('/', (request, response, next) => {
    const product = request.body;
    let query = "INSERT INTO products(name,description,price) VALUES(?,?,?)";
    connection.query(query, [product.name, product.description, product.price], (error, result) => {
        if (!error) {
            return response.json({ success: true, message: "Product created successfully.", data: {} });
        } else {
            return response.status(500).json({ success: false, message: error, data: {} });
        }
    });
});

//Get single product
router.get('/:id', (request, response, next) => {
    let productId = request.params.id;
    let query = "SELECT * FROM products WHERE id = ?";
    connection.query(query, [productId], (error, result) => {
        if (!error) {
            return response.json({ success: true, message: "Get a single successfully.", data: result });
        } else {
            return response.status(500).json({ success: false, message: error, data: {} });
        }
    })
});

//update product
router.patch('/:id', (request, response, next) => {
    const productId = request.params.id;
    const product = request.body;
    let query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    connection.query(query, [product.name, product.description, product.price, productId], (error, result) => {
        if (!error) {
            return response.json({ success: true, message: "Product updated successfully.", data: {} });
        } else {
            return response.status(500).json({ success: false, message: error, data: {} });
        }
    })
});

//delete product
router.delete('/:id', (request, response, next) => {
    const productId = request.params.id;
    let query = "DELETE FROM products where id = ?";
    connection.query(query, [productId], (error, result) => {
        if (!error) {
            return response.json({ success: true, message: "Product deleted successfully.", data: {} });
        } else {
            return response.status(500).json({ success: false, message: error, data: {} });
        }
    });
});

module.exports = router;