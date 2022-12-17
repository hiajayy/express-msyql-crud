const productService = require('../services/productService');

const getAllProducts = async (request, response) => {
    try {
        const products = await productService.getAllProducts();
        response.json({ "status": "OK", data: products });
    } catch (error) {
        response.status(500).json({ "status": "FAILED", "message": "Server error. Please try again after sometimes." });
    }
}

const storeNewProduct = async (request, response) => {
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": "FAILED", "message": "One of the following keys is missing or is empty in request body: 'name', 'description', 'price'" });
        return;
    }
    try {
        const newProduct = { name, description, price }
        const product = await productService.storeNewProduct(newProduct);
        response.status(201).json({ "status": "OK", "data": product });
    } catch (error) {
        response.status(500).json({ "status": "FAILED", "message": "Server error. Please try again after sometimes." });
    }
}

const getOneProduct = async (request, response) => {
    const productId = request.params.id;
    try {
        const product = await productService.getOneProduct(productId);
        response.json({ "status": "OK", "data": product });
    } catch (error) {
        response.status(500).json({ "status": "FAILED", "message": "Server error. Please try again after sometimes." });
    }
}

const updateOneProduct = async (request, response) => {
    const productId = request.params.id;
    const { name, description, price } = request.body;
    if (!name || !description || !price) {
        response.status(422).json({ "status": "FAILED", "message": "One of the following keys is missing or is empty in request body: 'name', 'description', 'price'" });
        return;
    }
    try {
        const updateProduct = { name, description, price, productId };
        const product = await productService.updateOneProduct(updateProduct);
        response.json({ "status": "OK", "data": product });
    } catch (error) {
        response.status(500).json({ "status": "FAILED", "message": "Server error. Please try again after sometimes." });
    }
}

const deleteOneProduct = async (request, response) => {
    const productId = request.params.id;
    try {
        productService.deleteOneProduct(productId);
        response.json({ "status": "OK" });
    } catch (error) {
        response.status(500).json({ "status": "FAILED", "message": "Server error. Please try again after sometimes." });
    }
}

module.exports = { getAllProducts, storeNewProduct, getOneProduct, updateOneProduct, deleteOneProduct };
