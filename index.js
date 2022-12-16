const express = require('express');
const app = express();
const PORT = 3000;
const productRoute = require('./routes/product');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/products', productRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));