const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../database/data.json');

async function readFile() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
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

module.exports = {
    getAllProducts,
    getProductById
};
