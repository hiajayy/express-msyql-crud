const productModel = require('../models/product');

async function index(request, response) {
    try {
        const products = await productModel.all();
        response.json({ "success": true, data: products });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
}

async function store(request, response) {
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": false, "message": "All fields are required." });
    }
    try {
        const product = await productModel.create(name, description, price);
        response.status(201).json({ "status": true, "data": product });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
}

async function show(request, response) {
    const productId = request.params.id;
    try {
        const product = await productModel.get(productId);
        response.json({ "status": true, "data": product });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
}

async function update(request, response) {
    const productId = request.params.id;
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": false, "message": "All fields are required." });
    }
    try {
        const product = await productModel.update(name, description, price, productId);
        response.json({ "status": true, "data": product });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
}

async function destroy(request, response) {
    const productId = request.params.id;
    try {
        productModel.delete(productId);
        response.json({ "status": true });
    } catch (error) {
        response.status(500).json({ "success": false, "message": "Something went wrong. Please try again after sometimes." });
    }
}

module.exports = { index, store, show, update, destroy };
