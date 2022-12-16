const router = require('express').Router();
const connection = require('../connection');

// Get all products
router.get('/', async (request, response) => {
    let query = "SELECT * FROM products";
    try {
        const [rows] = await connection.query(query);
        response.json({ "success": true, data: rows });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }

});

// Store a product
router.post('/', async (request, response) => {
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": false, "message": "All fields are required." });
    }
    let query = "INSERT INTO products(name,description,price) VALUES(?,?,?)";
    try {
        const [result] = await connection.query(query, [name, description, price]);
        const lastInsertID = result.insertId;
        response.status(201).json({ "status": true, "data": { id: lastInsertID, name, description, price } });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
});

//Get single product
router.get('/:id', async (request, response) => {
    let productId = request.params.id;
    let query = "SELECT * FROM products WHERE id = ?";
    try {
        const [rows] = await connection.query(query, [productId]);
        response.json({ "status": true, "data": rows[0] });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
});

//update product
router.patch('/:id', async (request, response) => {
    const productId = request.params.id;
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": false, "message": "All fields are required." });
    }
    try {
        let query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
        await connection.query(query, [name, description, price, productId]);
        response.json({ "status": true, "data": { id: parseInt(productId), name, description, price } });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }

});

//delete product
router.delete('/:id', async (request, response) => {
    const productId = request.params.id;
    let query = "DELETE FROM products where id = ?";
    try {
        await connection.query(query, [productId]);
        response.json({ "status": true });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
});

module.exports = router;