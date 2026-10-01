const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../database/data.json');

async function readFile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeFile(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

async function readFileDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return await readFile();
}

const getAllProducts = async () => {
    return await readFileDelay();
};

const getProductById = async (id) => {
    const products = await readFileDelay();
    return products.find((item) => item.id === id);
};

const createProduct = async (productData) => {
    const products = await readFile();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    await writeFile(products);
    return newProduct;
};

const updateProduct = async (id, productData) => {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { id, ...productData };
    await writeFile(products);
    return products[index];
};

const patchProduct = async (id, productData) => {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...productData, id };
    await writeFile(products);
    return products[index];
};

const deleteProduct = async (id) => {
    const products = await readFile();
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const [deleted] = products.splice(index, 1);
    await writeFile(products);
    return deleted;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
