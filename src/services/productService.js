const productModel = require('../models/product');

const getAllProducts = async () => {
    const products = await productModel.all();
    return products;
}

const storeNewProduct = async (newProduct) => {
    const product = await productModel.create(newProduct.name, newProduct.description, newProduct.price);
    return product;

}

const getOneProduct = async (productId) => {
    const product = await productModel.get(productId);
    return product;
}

const updateOneProduct = async (updateProduct) => {
    const product = productModel.update(updateProduct.name, updateProduct.description, updateProduct.price, updateProduct.productId);
    return product;

}

const deleteOneProduct = async (productId) => {
    productModel.delete(productId);
    return;
}

module.exports = { getAllProducts, storeNewProduct, getOneProduct, updateOneProduct, deleteOneProduct };
