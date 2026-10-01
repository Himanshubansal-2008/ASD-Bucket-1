const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use('/products', productRoutes);

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}/`);
});

module.exports = app;
