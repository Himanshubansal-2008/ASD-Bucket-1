const productService = require('../services/productService');
const { clearCache } = require('../middleware/cacheMiddleware');

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        clearCache();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const updated = await productService.updateProduct(id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Product not found' });
        }
        clearCache(id);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const patchProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const patched = await productService.patchProduct(id, req.body);
        if (!patched) {
            return res.status(404).json({ message: 'Product not found' });
        }
        clearCache(id); 
        res.json(patched);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }
        clearCache(id); 
        res.json({ message: 'Product deleted successfully', product: deleted });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
