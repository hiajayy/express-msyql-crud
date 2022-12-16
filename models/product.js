const connection = require('../connection');

/**
 * Fetch a single product
 */
async function get(productID) {
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await connection.query(query, [productID]);
    return rows[0] ?? {};
}

/**
 * Store a new product
 */
async function create(name, description, price) {
    const query = "INSERT INTO products(name,description,price) VALUES(?,?,?)";
    const [result] = await connection.query(query, [name, description, price]);
    const lastInsertID = result.insertId;
    const product = await get(lastInsertID);
    return product;
}

/**
 * Fetch all products 
 */
async function all() {
    const query = "SELECT * FROM products";
    const [rows] = await connection.query(query);
    return rows;
}

/**
 * Update a product
 */
async function update(name, description, price, productID) {
    const query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    await connection.query(query, [name, description, price, productID]);
    const product = await get(productID);
    return product;
}

/**
 * Delete a product
 */
async function deleteProduct(productID) {
    const query = "DELETE FROM products where id = ?";
    await connection.query(query, [productID]);
    return;
}

module.exports = { get, create, all, update, delete: deleteProduct };