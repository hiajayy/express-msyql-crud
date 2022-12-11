const express = require('express');
const connection = require('./connection');
const app = express();
const port = 3000;
const productRoute = require('./routes/product');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/products', productRoute);

app.listen(port);